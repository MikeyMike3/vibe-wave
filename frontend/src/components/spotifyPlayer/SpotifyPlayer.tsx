import { useEffect } from 'react';
import { usePlaySong } from '../../hooks/spotifyPlayer/usePlaySong';
import { useSpotifyPlayerContext } from '../../hooks/context/useSpotifyPlayerContext';
import { useQueueContext } from '../../hooks/context/useQueueContext';
import { NextTrackButton } from './NextTrackButton';
import { PreviousTrackButton } from './PreviousTrackButton';
import { RepeatButton } from './RepeatButton';
import { usePlaybackContext } from '../../hooks/context/usePlaybackContext';
import { ShuffleTracksButton } from './ShuffleTracksButton';
import { ProgressTracker } from './ProgressTracker';
import { useIndexPlaylistQueue } from '../../hooks/spotifyPlayer/useIndexPlaylistQueue';
import { Queue } from './Queue';
import { TrackInfo } from '../TrackInfo';
import { VolumeControl } from './VolumeControl';
import { TogglePlayButton } from './TogglePlayButton';
import { TogglePauseButton } from './TogglePauseButton';

export const SpotifyPlayer = () => {
  const { player } = useSpotifyPlayerContext();
  const { deviceId } = useSpotifyPlayerContext();
  const {
    repeatRef,
    playerState,
    setPlayerState,
    isPausedRef,
    setPlayerDuration,
    setPlayerPosition,
    playerDuration,
  } = usePlaybackContext();
  const {
    priorityQueue,
    setPriorityQueue,
    playlistQueue,
    setPlaylistQueue,
    playlistQueueIndexRef,
  } = useQueueContext();

  const playSong = usePlaySong();
  const indexPlaylistQueue = useIndexPlaylistQueue();

  useEffect(() => {
    const onPlayerStateChanged = (state: Spotify.PlaybackState) => {
      if (state.duration !== playerDuration) {
        setPlayerDuration(state.duration);
      }

      setPlayerPosition(state.position);

      if (isPausedRef.current) {
        player?.pause();
      }

      // moves the queues along when the song ends
      if (repeatRef.current !== 2) {
        if (priorityQueue && state.track_window.current_track?.name === priorityQueue[0]?.name) {
          setPriorityQueue(prevQueue => {
            if (
              prevQueue.length > 0 &&
              state.track_window.current_track?.name === prevQueue[0].name
            ) {
              return prevQueue.slice(1);
            }
            return prevQueue;
          });
        } else if (
          state.track_window.current_track?.name ===
          playlistQueue[playlistQueueIndexRef.current]?.track?.name
        ) {
          indexPlaylistQueue(1, '+');
        }
      }

      // play the next song in the queue if either queues have items in them
      if (state.track_window.current_track?.name === state.track_window.previous_tracks[0]?.name) {
        // play the song that the user wants to have on repeat
        if (repeatRef.current === 2) {
          playSong(state.track_window.current_track.uri);
        } else if (priorityQueue && priorityQueue.length > 0) {
          playSong(priorityQueue[0]?.uri);
        } else if (playlistQueue.length > 0) {
          if (playlistQueueIndexRef.current === playlistQueue.length) {
            // plays the first song of the playlistQueue once the last song ends
            if (repeatRef.current === 1) {
              indexPlaylistQueue(0, 'set');

              playSong(playlistQueue[0].track?.uri);
            } else {
              // pauses the first song of the playlistQueue once the last song ends
              indexPlaylistQueue(0, 'set');
              playSong(playlistQueue[0].track?.uri);
              isPausedRef.current = true;
            }
          }
          playSong(playlistQueue[playlistQueueIndexRef.current].track?.uri);
        }
      }
      setPlayerState(state);
    };

    const interval = setInterval(async () => {
      try {
        const state = await player?.getCurrentState();
        if (state && !state.paused && state.position < state.duration) {
          setPlayerPosition(state.position);
        }
      } catch (error) {
        console.error('Error fetching player state:', error);
      }
    }, 1000);

    player?.addListener('player_state_changed', onPlayerStateChanged);

    return () => {
      player?.removeListener('player_state_changed', onPlayerStateChanged);
      clearInterval(interval);
    };
  }, [
    deviceId,
    player,
    setPriorityQueue,
    priorityQueue,
    playlistQueue,
    setPlaylistQueue,
    playlistQueueIndexRef,
    playSong,
    isPausedRef,
    repeatRef,
    setPlayerState,
    setPlayerDuration,
    setPlayerPosition,
    playerState,
    indexPlaylistQueue,
    playerDuration,
  ]);

  return (
    <footer className="sticky bottom-0 z-[9999] mt-auto grid w-full grid-cols-[25%_50%_25%] items-center bg-black p-3 text-white">
      <TrackInfo
        name={playerState?.track_window?.current_track?.name}
        images={playerState?.track_window?.current_track?.album?.images}
        artists={playerState?.track_window?.current_track?.artists}
      />
      <div className="mx-auto flex flex-col items-center gap-4">
        <div className="flex gap-10">
          <ShuffleTracksButton />
          <PreviousTrackButton />
          {playerState?.paused ? <TogglePlayButton /> : <TogglePauseButton />}
          <NextTrackButton />
          <RepeatButton />
        </div>
        <ProgressTracker />
      </div>
      <div className="ml-auto flex items-center gap-4">
        <Queue />
        <VolumeControl />
      </div>
    </footer>
  );
};

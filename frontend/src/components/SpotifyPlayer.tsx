import { useEffect } from 'react';
import { usePlaySong } from '../hooks/spotifyPlayer/usePlaySong';
import { useTogglePlay } from '../hooks/spotifyPlayer/useTogglePlay';
import { getImageUrl } from '../functions/getImageUrl';
import { useSpotifyPlayerContext } from '../hooks/context/useSpotifyPlayerContext';
import { useQueueContext } from '../hooks/context/useQueueContext';
import { NextTrackButton } from './NextTrackButton';
import { PreviousTrackButton } from './PreviousTrackButton';
import { RepeatButton } from './RepeatButton';
import { usePlaybackContext } from '../hooks/context/usePlaybackContext';
import { ShuffleTracksButton } from './ShuffleTracksButton';
import { ProgressTracker } from './ProgressTracker';

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
  } = usePlaybackContext();
  const {
    priorityQueue,
    setPriorityQueue,
    playlistQueue,
    setPlaylistQueue,
    playlistQueueIndexRef,
  } = useQueueContext();

  const togglePlay = useTogglePlay();
  const playSong = usePlaySong();

  useEffect(() => {
    const onPlayerStateChanged = (state: Spotify.PlaybackState) => {
      setPlayerDuration(state.duration);
      setPlayerPosition(state.position);
      if (isPausedRef.current) {
        player?.pause();
      }

      // moves the queues along when the song ends
      if (repeatRef.current !== 2) {
        if (state.track_window.current_track?.name === priorityQueue[0]?.name) {
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
          playlistQueueIndexRef.current++;
        }
      }

      // play the next song in the queue if either queues have items in them
      if (state.track_window.current_track?.name === state.track_window.previous_tracks[0]?.name) {
        // play the song that the user wants to have on repeat
        if (repeatRef.current === 2) {
          playSong(state.track_window.current_track.uri);
        } else if (priorityQueue.length > 0) {
          playSong(priorityQueue[0]?.uri);
        } else if (playlistQueue.length > 0) {
          if (playlistQueueIndexRef.current === playlistQueue.length) {
            // plays the first song of the playlistQueue once the last song ends
            if (repeatRef.current === 1) {
              playlistQueueIndexRef.current = 0;
              playSong(playlistQueue[0].track?.uri);
            } else {
              // pauses the first song of the playlistQueue once the last song ends
              playlistQueueIndexRef.current = 0;
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
        if (state && !state.paused) {
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
  ]);

  const image = getImageUrl(playerState?.track_window?.current_track?.album?.images);

  return (
    <footer className="mt-auto grid grid-cols-[25%_50%_25%] items-center bg-black p-3 text-white">
      <div className="flex gap-2">
        <img className="h-20 w-20" src={image}></img>
        <div className="flex flex-col justify-center gap-1">
          <p>{playerState?.track_window?.current_track?.name}</p>
          <p>
            {playerState?.track_window?.current_track?.artists.map(item => item.name).join(', ')}
          </p>
        </div>
      </div>
      <div className="mx-auto flex flex-col items-center gap-4">
        <div className="flex gap-10">
          <ShuffleTracksButton />
          <PreviousTrackButton />
          {playerState?.paused ? (
            <button onClick={togglePlay}>Play</button>
          ) : (
            <button onClick={togglePlay}>Pause</button>
          )}
          <NextTrackButton />
          <RepeatButton />
        </div>
        <ProgressTracker />
      </div>
      <div className="ml-auto">Volume</div>
    </footer>
  );
};

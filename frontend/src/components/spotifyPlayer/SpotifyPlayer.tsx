import { useEffect, useRef, useState } from 'react';
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
import { getImageUrl } from '../../functions/getImageUrl';
import { getBackgroundImageColor } from '../../functions/getBackgroundImageColor';

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

  const playSongMutation = usePlaySong();
  const indexPlaylistQueue = useIndexPlaylistQueue();

  const isTransitioningRef = useRef(false);

  const [backgroundColor, setBackgroundColor] = useState<string>('');

  const image = getImageUrl(playerState?.track_window.current_track.album.images);

  useEffect(() => {
    if (image) {
      getBackgroundImageColor(image, setBackgroundColor, true);
    }
  }, [image]);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const debounce = <T extends (...args: any[]) => void>(func: T, wait: number) => {
    //prettier-ignore
    let timeout: ReturnType<typeof setTimeout>;
    //prettier-ignore
    return (...args: Parameters<T>) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => func.apply(this, args), wait);
    };
  };

  const handleSongEnd = debounce(state => {
    if (isTransitioningRef.current) {
      return;
    }

    isTransitioningRef.current = true;
    // play the song that the user wants to have on repeat
    if (repeatRef.current === 2) {
      playSongMutation({ uri: state.track_window.current_track.uri, options: {} }).finally(() => {
        isTransitioningRef.current = false;
      });
    } else if (priorityQueue && priorityQueue.length > 0) {
      playSongMutation({ uri: priorityQueue[0]?.uri, options: {} }).finally(() => {
        isTransitioningRef.current = false;
      });
    } else if (playlistQueue.length > 0) {
      if (playlistQueueIndexRef.current === playlistQueue.length) {
        if (repeatRef.current === 1) {
          indexPlaylistQueue(0, 'set');
          playSongMutation({ uri: playlistQueue[0].track?.uri, options: {} }).finally(() => {
            isTransitioningRef.current = false;
          });
        } else {
          indexPlaylistQueue(0, 'set');
          playSongMutation({ uri: playlistQueue[0].track?.uri, options: {} }).finally(() => {
            isPausedRef.current = true;
            isTransitioningRef.current = false;
          });
        }
      } else {
        playSongMutation({
          uri: playlistQueue[playlistQueueIndexRef.current].track?.uri,
          options: {},
        }).finally(() => {
          isTransitioningRef.current = false;
        });
      }
    }
  }, 500);

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
        handleSongEnd(state);
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
    playSongMutation,
    isPausedRef,
    repeatRef,
    setPlayerState,
    setPlayerDuration,
    setPlayerPosition,
    playerState,
    indexPlaylistQueue,
    playerDuration,
    handleSongEnd,
  ]);

  return (
    <footer
      className="sticky bottom-0 z-[9999] mt-auto grid w-full grid-cols-[25%_50%_25%] items-center rounded-3xl bg-black p-3 text-white"
      style={{ backgroundColor: `${backgroundColor}` }}
    >
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

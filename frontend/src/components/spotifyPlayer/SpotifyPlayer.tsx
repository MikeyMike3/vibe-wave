import { useEffect, useRef } from 'react';
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
import { useGetBackgroundImageColor } from '../../hooks/useGetBackgroundImageColor';
import { isPlaylistTrackObjectArray } from '../../types/typeGuards/isPlaylistTrackObjectArray';
import { isSingleAlbumResponse } from '../../types/typeGuards/isSIngleAlbumResponse';
import { useDynamicImageBgColorContext } from '../../hooks/context/useDynamicImageBgColorContext';
import { splitAlbumUri } from '../../functions/splitAlbumUri';
import { VibeWaveTrackPlaceHolder } from './VibeWaveTrackPlaceHolder';
import { removeFirstFromPriorityQueueSessionData } from '../../functions/sessionStorage/priorityQueue/removeFirstFromPriorityQueueSessionData';
import { addCurrentlyPlayingTrackSessionStorage } from '../../functions/sessionStorage/playback/currentlyPlayingTrack/addCurrentlyPlayingTrackSessionStorage';
import { addPlayerPositionSessionStorage } from '../../functions/sessionStorage/playback/playerPosition/addPlayerPositionSessionStorage';

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

  const {
    dynamicImageBgColorDark,
    setDynamicImageBgColorMaster,
    dynamicImageBgColorLighter,
    dynamicImageBgColorMuted,
  } = useDynamicImageBgColorContext();

  const playSongMutation = usePlaySong();
  const indexPlaylistQueue = useIndexPlaylistQueue();

  const getBackgroundImageColor = useGetBackgroundImageColor();

  const isTransitioningRef = useRef(false);

  const image = getImageUrl(playerState?.track_window.current_track.album.images);

  useEffect(() => {
    if (image) {
      (async () => {
        const color = await getBackgroundImageColor(image);
        setDynamicImageBgColorMaster(color);
      })();
    }
  }, [image, getBackgroundImageColor, setDynamicImageBgColorMaster]);
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
    } else if (playlistQueue && isPlaylistTrackObjectArray(playlistQueue)) {
      if (playlistQueue.length > 0) {
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
    } else if (playlistQueue && isSingleAlbumResponse(playlistQueue)) {
      if (playlistQueue.tracks.items.length > 0) {
        if (playlistQueueIndexRef.current === playlistQueue.tracks.items.length) {
          if (repeatRef.current === 1) {
            indexPlaylistQueue(0, 'set');
            playSongMutation({ uri: playlistQueue.tracks.items[0].uri, options: {} }).finally(
              () => {
                isTransitioningRef.current = false;
              },
            );
          } else {
            indexPlaylistQueue(0, 'set');
            playSongMutation({ uri: playlistQueue.tracks.items[0].uri, options: {} }).finally(
              () => {
                isPausedRef.current = true;
                isTransitioningRef.current = false;
              },
            );
          }
        } else {
          playSongMutation({
            uri: playlistQueue.tracks.items[playlistQueueIndexRef.current].uri,
            options: {},
          }).finally(() => {
            isTransitioningRef.current = false;
          });
        }
      }
    } else {
      console.error('playlistQueue is undefined or not a valid type.');
    }
  }, 500);

  useEffect(() => {
    const onPlayerStateChanged = (state: Spotify.PlaybackState) => {
      if (state.duration !== playerDuration) {
        setPlayerDuration(state.duration);
      }

      if (state.track_window.current_track.uri) {
        addCurrentlyPlayingTrackSessionStorage(state.track_window.current_track.uri);
      }

      setPlayerPosition(state.position);

      if (isPausedRef.current) {
        player?.pause();
      }

      // moves the queues along when the song ends
      if (repeatRef.current !== 2) {
        if (priorityQueue && priorityQueue?.length > 0) {
          const prevPriorityTrack: string[] = priorityQueue[0].name.split(' ');

          if (state.track_window.current_track?.name === priorityQueue[0]?.name) {
            setPriorityQueue(prevQueue => {
              if (
                prevQueue &&
                prevQueue.length > 0 &&
                state.track_window.current_track?.name === prevQueue[0].name
              ) {
                removeFirstFromPriorityQueueSessionData();
                return prevQueue.slice(1);
              }
              return prevQueue;
            });
          } else if (
            priorityQueue[0].id !== state.track_window.current_track?.id &&
            state.track_window.current_track?.name.includes(prevPriorityTrack[0])
          ) {
            setPriorityQueue(prevQueue => {
              removeFirstFromPriorityQueueSessionData();
              return prevQueue?.slice(1);
            });
          }
        } else if (playlistQueue && isPlaylistTrackObjectArray(playlistQueue)) {
          if (
            playlistQueue &&
            state.track_window.current_track?.name ===
              playlistQueue[playlistQueueIndexRef.current]?.track?.name
          ) {
            indexPlaylistQueue(1, '+');
          }

          // this detects if the song version changed
          // a song version change is when the same song plays but it has a different id/name value. Any property value within the song data can change
          // this keeps the queue moving along because the name of the song may be slightly different
          if (
            playlistQueue &&
            playlistQueueIndexRef.current > 1 &&
            state.track_window.current_track.name !==
              playlistQueue[playlistQueueIndexRef.current - 1].track?.name
          ) {
            if (playlistQueue.length !== playlistQueueIndexRef.current) {
              const prevTrackNameSplit =
                playlistQueue[playlistQueueIndexRef.current].track?.name.split(' ');

              if (
                playlistQueue &&
                prevTrackNameSplit &&
                state.track_window.current_track.name.includes(prevTrackNameSplit[0])
              ) {
                indexPlaylistQueue(1, '+');
              }
            }
          }
        } else if (playlistQueue && isSingleAlbumResponse(playlistQueue)) {
          // Handle the case when playlistQueue is a SingleAlbumResponse
          const currentTrack = playlistQueue.tracks.items[playlistQueueIndexRef.current];
          if (playlistQueue && state.track_window.current_track?.name === currentTrack?.name) {
            indexPlaylistQueue(1, '+');
          }

          // this detects if the song version changed
          // a song version change is when the same song plays but it has a different id/name value. Any property value within the song data can change
          // this keeps the queue moving along because the name of the song may be slightly different
          if (
            playlistQueue &&
            playlistQueueIndexRef.current > 1 &&
            state.track_window.current_track.name !==
              playlistQueue.tracks.items[playlistQueueIndexRef.current - 1].name
          ) {
            if (playlistQueue.tracks.items.length !== playlistQueueIndexRef.current) {
              const prevTrackNameSplit =
                playlistQueue.tracks.items[playlistQueueIndexRef.current].name.split(' ');

              if (
                playlistQueue &&
                prevTrackNameSplit &&
                state.track_window.current_track.name.includes(prevTrackNameSplit[0])
              ) {
                indexPlaylistQueue(1, '+');
              }
            }
          }
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
          addPlayerPositionSessionStorage(state.position);
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
      className="sticky bottom-0 z-[9999] mt-auto grid w-full grid-cols-[25%_50%_25%] items-center gap-3 rounded-3xl bg-black p-3 text-white"
      style={{ backgroundColor: `${dynamicImageBgColorDark}` }}
    >
      {!playerState ? (
        <VibeWaveTrackPlaceHolder image={image} />
      ) : (
        <TrackInfo
          name={playerState?.track_window?.current_track?.name}
          images={playerState?.track_window?.current_track?.album?.images}
          artists={playerState?.track_window?.current_track?.artists}
          albumId={splitAlbumUri(playerState?.track_window.current_track.album.uri)}
        />
      )}

      <div className="mx-auto flex w-full flex-col items-center gap-2 2xl:w-[590px]">
        <div className="flex gap-10">
          <ShuffleTracksButton
            activeButtonColor={dynamicImageBgColorLighter}
            notActiveButtonColor={dynamicImageBgColorMuted}
          />
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

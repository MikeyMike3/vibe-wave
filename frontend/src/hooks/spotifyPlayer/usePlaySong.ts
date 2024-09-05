import { usePlaybackContext } from '../context/usePlaybackContext';
import { useQueueContext } from '../context/useQueueContext';
import { useSpotifyPlayerContext } from '../context/useSpotifyPlayerContext';
import { useIndexPlaylistQueue } from './useIndexPlaylistQueue';

let controller: AbortController | null = null;

type PlaySongOptions = {
  shouldUnpause?: boolean;
  shouldClearQueue?: boolean;
  tempQueue?: SpotifyApi.PlaylistTrackObject[];
};

export const usePlaySong = () => {
  const { player, deviceId } = useSpotifyPlayerContext();
  const {
    playlistQueueIndexRef,
    playlistQueue,
    priorityQueue,
    setPlaylistQueue,
    setPriorityQueue,
  } = useQueueContext();
  const { userPreviousTrackRef, userSkippedTrackRef, repeatRef, isPausedRef } =
    usePlaybackContext();
  const indexPlaylistQueue = useIndexPlaylistQueue();
  // shouldUnpause tells this function to override the isPausedRef so that the song will play
  // if the song plays then quickly pauses then you need to set shouldUnpause to true
  const playSong = async (uri: string | undefined, options: PlaySongOptions = {}) => {
    const { shouldUnpause = false, shouldClearQueue = false, tempQueue = [] } = options;
    if (shouldUnpause) {
      isPausedRef.current = false;
    }

    if (shouldClearQueue) {
      indexPlaylistQueue(0, 'set');
      setPlaylistQueue([]);
      setPriorityQueue([]);
    }

    if (!player || !deviceId || !uri) {
      return;
    }

    if (controller) {
      controller.abort();
    }

    controller = new AbortController();
    const { signal } = controller;

    player._options.getOAuthToken(async accessToken => {
      try {
        const response = await fetch(
          `https://api.spotify.com/v1/me/player/play?device_id=${deviceId}`,
          {
            method: 'PUT',
            body: JSON.stringify({ uris: [uri] }),
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${accessToken}`,
            },
            signal,
          },
        );

        if (!response.ok) {
          console.error('Failed to start playback', await response.json());
          if (response.status === 403) {
            if (priorityQueue.length > 0) {
              setPriorityQueue(prevQueue => {
                const newQueue = prevQueue.filter(track => track.name !== prevQueue[0].name);
                if (newQueue.length > 0) {
                  playSong(newQueue[0].uri);
                }
                return newQueue;
              });

              if (playlistQueue.length > 0) {
                indexPlaylistQueue(1, '+');
                playSong(playlistQueue[playlistQueueIndexRef.current].track?.uri);
              }
            } else if (userSkippedTrackRef.current) {
              indexPlaylistQueue(1, '+');
              playSong(playlistQueue[playlistQueueIndexRef.current].track?.uri);
            } else if (userPreviousTrackRef.current) {
              if (repeatRef.current === 1 && playlistQueueIndexRef.current <= 1) {
                indexPlaylistQueue(1 + playlistQueue.length, 'set');
                playlistQueueIndexRef.current = playlistQueue.length + 1;
              }

              if (playlistQueue.length > 0 && playlistQueueIndexRef.current > 1) {
                // playlistQueueIndexRef.current must be subtracted by 2 to be able to play the previous song
                indexPlaylistQueue(2, '-');
                playSong(playlistQueue[playlistQueueIndexRef.current].track?.uri);
              }
            } else if (tempQueue.length > 0) {
              indexPlaylistQueue(1, '+');
              playSong(tempQueue[playlistQueueIndexRef.current].track?.uri);
            } else if (playlistQueue.length) {
              indexPlaylistQueue(1, '+');
              playSong(playlistQueue[playlistQueueIndexRef.current].track?.uri);
            }
          }
        }
        if (response.ok) {
          userSkippedTrackRef.current = false;
          userPreviousTrackRef.current = false;
        }
      } catch (error) {
        if (error instanceof Error) {
          if (error.name !== 'AbortError') {
            console.error('Fetch error', error.message);
          }
        } else {
          console.error('Unexpected error', error);
        }
      }
    });
  };

  return playSong;
};

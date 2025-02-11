import { useMutation } from '@tanstack/react-query';
import { usePlaybackContext } from '../context/usePlaybackContext';
import { useQueueContext } from '../context/useQueueContext';
import { useSpotifyPlayerContext } from '../context/useSpotifyPlayerContext';
import { useIndexPlaylistQueue } from './useIndexPlaylistQueue';
import { isPlaylistTrackObjectArray } from '../../types/typeGuards/isPlaylistTrackObjectArray';
import { isSingleAlbumResponse } from '../../types/typeGuards/isSIngleAlbumResponse';

let controller: AbortController | null = null;

type PlaySongOptions = {
  shouldUnpause?: boolean;
  shouldClearQueue?: boolean;
  tempQueue?: SpotifyApi.PlaylistTrackObject[] | SpotifyApi.SingleAlbumResponse | undefined;
  seekTo?: number;
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
  const playSong = async (params: { uri: string | undefined; options: PlaySongOptions }) => {
    const { uri, options } = params;
    const { shouldUnpause = false, shouldClearQueue = false, tempQueue = [], seekTo = 0 } = options;

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
            if (priorityQueue && priorityQueue.length > 0) {
              setPriorityQueue(prevQueue => {
                if (prevQueue) {
                  const newQueue = prevQueue.filter(track => track.name !== prevQueue[0].name);
                  if (newQueue.length > 0) {
                    playSong({ uri: newQueue[0].uri, options: {} });
                  }
                  return newQueue;
                }
              });

              if (!playlistQueue) {
                return;
              }
              if (isPlaylistTrackObjectArray(playlistQueue) && playlistQueue.length > 0) {
                indexPlaylistQueue(1, '+');
                playSong({
                  uri: playlistQueue[playlistQueueIndexRef.current].track?.uri,
                  options: {},
                });
              } else if (isSingleAlbumResponse(playlistQueue)) {
                indexPlaylistQueue(1, '+');
                playSong({
                  uri: playlistQueue.tracks.items[playlistQueueIndexRef.current].uri,
                  options: {},
                });
              }
            } else if (!playlistQueue) {
              return;
            } else if (userSkippedTrackRef.current) {
              if (isPlaylistTrackObjectArray(playlistQueue)) {
                indexPlaylistQueue(1, '+');
                playSong({
                  uri: playlistQueue[playlistQueueIndexRef.current].track?.uri,
                  options: {},
                });
              } else if (isSingleAlbumResponse(playlistQueue)) {
                indexPlaylistQueue(1, '+');
                playSong({
                  uri: playlistQueue.tracks.items[playlistQueueIndexRef.current].uri,
                  options: {},
                });
              }
            } else if (userPreviousTrackRef.current) {
              if (repeatRef.current === 1 && playlistQueueIndexRef.current <= 1) {
                if (isPlaylistTrackObjectArray(playlistQueue)) {
                  indexPlaylistQueue(1 + playlistQueue.length, 'set');
                  playlistQueueIndexRef.current = playlistQueue.length + 1;
                } else if (isSingleAlbumResponse(playlistQueue)) {
                  indexPlaylistQueue(1 + playlistQueue.tracks.items.length, 'set');
                  playlistQueueIndexRef.current = playlistQueue.tracks.items.length + 1;
                }
              }
              if (isPlaylistTrackObjectArray(playlistQueue)) {
                if (playlistQueue.length > 0 && playlistQueueIndexRef.current > 1) {
                  // playlistQueueIndexRef.current must be subtracted by 2 to be able to play the previous song
                  indexPlaylistQueue(2, '-');
                  playSong({
                    uri: playlistQueue[playlistQueueIndexRef.current].track?.uri,
                    options: {},
                  });
                }
              } else if (isSingleAlbumResponse(playlistQueue)) {
                indexPlaylistQueue(2, '-');
                playSong({
                  uri: playlistQueue.tracks.items[playlistQueueIndexRef.current].uri,
                  options: {},
                });
              }
            } else if (isPlaylistTrackObjectArray(tempQueue)) {
              if (tempQueue.length > 0) {
                indexPlaylistQueue(1, '+');
                playSong({ uri: tempQueue[playlistQueueIndexRef.current].track?.uri, options: {} });
              }
            } else if (isSingleAlbumResponse(tempQueue)) {
              if (tempQueue.tracks.items.length > 0) {
                indexPlaylistQueue(1, '+');
                playSong({
                  uri: tempQueue.tracks.items[playlistQueueIndexRef.current].uri,
                  options: {},
                });
              }
            } else if (isPlaylistTrackObjectArray(playlistQueue)) {
              if (playlistQueue.length > 0) {
                indexPlaylistQueue(1, '+');
                playSong({
                  uri: playlistQueue[playlistQueueIndexRef.current].track?.uri,
                  options: {},
                });
              }
            } else if (isSingleAlbumResponse(playlistQueue)) {
              if (playlistQueue.tracks.items.length > 0) {
                indexPlaylistQueue(1, '+');
                playSong({
                  uri: playlistQueue.tracks.items[playlistQueueIndexRef.current].uri,
                  options: {},
                });
              }
            }
          }
        }
        if (response.ok) {
          userSkippedTrackRef.current = false;
          userPreviousTrackRef.current = false;
          if (seekTo - 1000 > 0) {
            player.seek(seekTo - 1000);
          } else {
            player.seek(0);
          }
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

  const { mutateAsync: playSongMutation } = useMutation({
    mutationFn: playSong,
  });

  return playSongMutation;
};

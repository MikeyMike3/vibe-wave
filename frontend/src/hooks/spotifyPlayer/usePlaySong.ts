import { usePlaybackContext } from '../context/usePlaybackContext';
import { useQueueContext } from '../context/useQueueContext';
import { useSpotifyPlayerContext } from '../context/useSpotifyPlayerContext';

let controller: AbortController | null = null;

export const usePlaySong = () => {
  const { player, deviceId, isPausedRef } = useSpotifyPlayerContext();
  const { playlistQueueIndexRef, playlistQueue } = useQueueContext();
  const { userPreviousTrackRef, userSkippedTrackRef, repeatRef } = usePlaybackContext();

  // shouldUnpause tells this function to override the isPausedRef so that the song will play
  // if the song plays then quickly pauses then you need to set shouldUnpause to true
  const playSong = async (uri: string | undefined, shouldUnpause?: boolean) => {
    if (shouldUnpause) {
      isPausedRef.current = false;
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
            if (userSkippedTrackRef.current) {
              playlistQueueIndexRef.current++;
              playSong(playlistQueue[playlistQueueIndexRef.current].track?.uri);
            } else if (userPreviousTrackRef.current) {
              if (repeatRef.current === 1 && playlistQueueIndexRef.current <= 1) {
                playlistQueueIndexRef.current = playlistQueue.length + 1;
              }

              if (playlistQueue.length > 0 && playlistQueueIndexRef.current > 1) {
                // playlistQueueIndexRef.current must be subtracted by 2 to be able to play the previous song
                playlistQueueIndexRef.current -= 2;
                playSong(playlistQueue[playlistQueueIndexRef.current].track?.uri);
              }
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

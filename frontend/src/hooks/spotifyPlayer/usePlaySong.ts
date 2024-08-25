import { useSpotifyPlayerContext } from '../context/useSpotifyPlayerContext';

let controller: AbortController | null = null;

export const usePlaySong = () => {
  const { player, deviceId } = useSpotifyPlayerContext();
  const playSong = async (uri: string | undefined) => {
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

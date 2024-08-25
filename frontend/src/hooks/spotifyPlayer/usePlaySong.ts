import { useSpotifyPlayerContext } from '../context/useSpotifyPlayerContext';

let controller: AbortController | null = null;

export const usePlaySong = () => {
  const { player, deviceId } = useSpotifyPlayerContext();
  const playSong = async (uri: string | undefined) => {
    if (!player || !deviceId || !uri) {
      return;
    }

    // Abort any ongoing fetch request
    if (controller) {
      controller.abort();
    }

    // Create a new AbortController for the new fetch request
    controller = new AbortController();
    const { signal } = controller;

    // Get OAuth token from the player
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
            signal, // Use the AbortController signal here
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

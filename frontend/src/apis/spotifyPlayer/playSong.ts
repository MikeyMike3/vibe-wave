export const playSong = async (
  player: Spotify.Player | undefined,
  deviceId: string,
  uri: string,
) => {
  if (!player || !deviceId) {
    console.log('aborted');
    return;
  }

  player._options.getOAuthToken(async accessToken => {
    const response = await fetch(
      `https://api.spotify.com/v1/me/player/play?device_id=${deviceId}`,
      {
        method: 'PUT',
        body: JSON.stringify({ uris: [uri] }),
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );

    if (response.ok) {
      console.log('Playback started');
      console.log(response);
    } else {
      console.error('Failed to start playback', await response.json());
    }
  });
};

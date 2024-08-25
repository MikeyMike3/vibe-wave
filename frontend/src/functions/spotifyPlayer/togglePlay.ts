export const togglePlay = (player: Spotify.Player | undefined) => {
  if (player) {
    player.togglePlay();
  }
};

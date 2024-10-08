export const formatTimeInHours = (
  playlistItems: SpotifyApi.PlaylistTrackObject[] | undefined,
): string | undefined => {
  if (!playlistItems) {
    return;
  }

  const totalDurationMs = playlistItems.reduce(
    (acc, item) => acc + (item.track?.duration_ms || 0),
    0,
  );

  const totalHours = Math.floor(totalDurationMs / (1000 * 60 * 60));
  const totalMinutes = Math.floor((totalDurationMs % (1000 * 60 * 60)) / (1000 * 60));

  return `${totalHours} hr ${totalMinutes} min`;
};

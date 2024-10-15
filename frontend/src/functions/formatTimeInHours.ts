export const formatTimeInHours = (
  playlistItems:
    | SpotifyApi.PlaylistTrackObject[]
    | SpotifyApi.SavedTrackObject[]
    | SpotifyApi.TrackObjectSimplified[]
    | undefined,
): string | undefined => {
  if (!playlistItems) {
    return;
  }

  let totalDurationMs;

  if (playlistItems.every((item): item is SpotifyApi.PlaylistTrackObject => 'track' in item)) {
    // Handle SpotifyApi.PlaylistTrackObject and SpotifyApi.SavedTrackObject which contain the `track` object
    totalDurationMs = playlistItems.reduce((acc, item) => acc + (item.track?.duration_ms || 0), 0);
  } else if (
    playlistItems.every((item): item is SpotifyApi.TrackObjectSimplified => 'duration_ms' in item)
  ) {
    // Handle SpotifyApi.TrackObjectSimplified which directly contains `duration_ms`
    totalDurationMs = playlistItems.reduce((acc, item) => acc + (item.duration_ms || 0), 0);
  } else {
    totalDurationMs = 0;
  }

  const totalHours = Math.floor(totalDurationMs / (1000 * 60 * 60));
  const totalMinutes = Math.floor((totalDurationMs % (1000 * 60 * 60)) / (1000 * 60));

  return `${totalHours} hr ${totalMinutes} min`;
};

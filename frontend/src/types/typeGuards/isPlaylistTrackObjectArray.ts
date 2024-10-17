export const isPlaylistTrackObjectArray = (
  queue: SpotifyApi.PlaylistTrackObject[] | SpotifyApi.SingleAlbumResponse,
): queue is SpotifyApi.PlaylistTrackObject[] => {
  return Array.isArray(queue) && queue.length > 0 && 'track' in queue[0];
};

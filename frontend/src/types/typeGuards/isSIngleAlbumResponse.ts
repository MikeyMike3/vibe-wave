export const isSingleAlbumResponse = (
  queue: SpotifyApi.PlaylistTrackObject[] | SpotifyApi.SingleAlbumResponse,
): queue is SpotifyApi.SingleAlbumResponse => {
  return !Array.isArray(queue) && 'album_type' in queue;
};

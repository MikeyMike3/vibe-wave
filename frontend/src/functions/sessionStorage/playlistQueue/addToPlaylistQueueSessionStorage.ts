export const addToPlaylistQueueSessionStorage = (
  queue: SpotifyApi.PlaylistTrackObject[] | SpotifyApi.SingleAlbumResponse | undefined,
) => {
  try {
    sessionStorage.setItem('playlistQueue', JSON.stringify(queue));
  } catch (error) {
    console.error('Failed to update playlistQueue in sessionStorage:', error);
  }
};

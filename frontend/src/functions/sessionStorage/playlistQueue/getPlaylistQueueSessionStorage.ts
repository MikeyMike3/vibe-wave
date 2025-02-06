export const getPlaylistQueueSessionStorage = () => {
  try {
    const storedQueue = sessionStorage.getItem('playlistQueue');
    if (!storedQueue) return undefined;

    const parsedQueue: SpotifyApi.PlaylistTrackObject[] | SpotifyApi.SingleAlbumResponse | null =
      JSON.parse(storedQueue);

    if (Array.isArray(parsedQueue)) {
      return parsedQueue.filter((item): item is SpotifyApi.PlaylistTrackObject => item !== null);
    }

    if (parsedQueue && typeof parsedQueue === 'object' && 'album_type' in parsedQueue) {
      return parsedQueue as SpotifyApi.SingleAlbumResponse;
    }

    return undefined;
  } catch (error) {
    console.error('Failed to retrieve playlistQueue:', error);
    return undefined;
  }
};

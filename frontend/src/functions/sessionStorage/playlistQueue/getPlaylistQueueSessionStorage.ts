export const getPlaylistQueueSessionStorage = () => {
  try {
    const storedQueue = sessionStorage.getItem('playlistQueue');
    if (!storedQueue) return undefined;

    const parsedQueue: SpotifyApi.PlaylistTrackObject[] | SpotifyApi.SingleAlbumResponse | null =
      JSON.parse(storedQueue);

    // Ensure the data is in the correct format before returning
    if (Array.isArray(parsedQueue)) {
      // If it's an array, filter out any potential `null` values
      return parsedQueue.filter((item): item is SpotifyApi.PlaylistTrackObject => item !== null);
    }

    if (parsedQueue && typeof parsedQueue === 'object' && 'album_type' in parsedQueue) {
      // If it's an object and contains an "album_type" property, assume it's a `SingleAlbumResponse`
      return parsedQueue as SpotifyApi.SingleAlbumResponse;
    }

    return undefined; // If the data is invalid, return undefined
  } catch (error) {
    console.error('Failed to retrieve playlistQueue:', error);
    return undefined;
  }
};

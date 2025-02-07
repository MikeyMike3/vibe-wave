export const getUnShuffledQueueRefSessionStorage = ():
  | SpotifyApi.PlaylistTrackObject[]
  | SpotifyApi.SingleAlbumResponse
  | undefined => {
  const storedValue = sessionStorage.getItem('unShuffledQueueRef');
  return storedValue ? JSON.parse(storedValue) : undefined;
};

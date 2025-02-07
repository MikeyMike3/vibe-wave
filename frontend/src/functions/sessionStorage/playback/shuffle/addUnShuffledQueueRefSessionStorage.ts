export const addUnShuffledQueueRefSessionStorage = (
  value: React.MutableRefObject<
    SpotifyApi.PlaylistTrackObject[] | SpotifyApi.SingleAlbumResponse | undefined
  >,
) => {
  sessionStorage.setItem('unShuffledQueueRef', JSON.stringify(value.current));
};

export const addPlaylistIdSessionStorage = (playlistId: string) => {
  sessionStorage.setItem('playlistId', playlistId);
};

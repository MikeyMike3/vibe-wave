export const addPlaylistNameSessionStorage = (playlistName: string) => {
  sessionStorage.setItem('playlistName', playlistName);
};

export const findAlbumReleaseDate = (releaseDate: string) => {
  const albumReleaseDateArray = releaseDate.split('-');
  return albumReleaseDateArray[0];
};

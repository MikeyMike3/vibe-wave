export const getImageUrl = (images: SpotifyApi.ImageObject[]) => {
  if (images) {
    return images[0].url;
  } else {
    return 'wasdw';
  }
};

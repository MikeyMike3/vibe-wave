export const getImageUrl = (images: Spotify.Image[] | undefined) => {
  if (images) {
    return images[0].url;
  } else {
    return 'wasdw';
  }
};

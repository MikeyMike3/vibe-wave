export const getImageUrl = (images: Spotify.Image[] | undefined) => {
  if (images && images.length > 0) {
    return images[0].url;
  } else {
    return 'wasdw';
  }
};

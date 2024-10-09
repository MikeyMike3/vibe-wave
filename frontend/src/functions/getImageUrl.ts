export const getImageUrl = (images: Spotify.Image[] | undefined) => {
  if (images && images.length > 0) {
    return images[0].url;
  } else {
    return 'https://mosaic.scdn.co/640/ab67616d00001e0205a448540b069450ccfba889ab67616d00001e02393d29e88d493bdab8af1617ab67616d00001e026a59c3251231317dfdb9cd9cab67616d00001e02f9f2d43ff44bdfbe8c556f8d';
  }
};

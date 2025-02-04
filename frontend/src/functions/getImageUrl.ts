import vibeWaveLogo from '../assets/imgs/VibeWave_Logo.jpg';

export const getImageUrl = (images: Spotify.Image[] | undefined) => {
  if (images && images.length > 0) {
    return images[0].url;
  } else {
    return vibeWaveLogo;
  }
};

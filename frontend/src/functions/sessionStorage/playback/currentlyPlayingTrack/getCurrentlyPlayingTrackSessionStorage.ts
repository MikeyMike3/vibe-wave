export const getCurrentlyPlayingTrackSessionStorage = () => {
  return sessionStorage.getItem('currentlyPlayingTrack') || undefined;
};

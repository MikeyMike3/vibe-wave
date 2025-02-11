export const addCurrentlyPlayingTrackSessionStorage = (trackUri: string) => {
  return sessionStorage.setItem('currentlyPlayingTrack', trackUri);
};

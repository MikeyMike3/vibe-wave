export const getShuffleTracksRefSessionStorage = (): boolean => {
  return JSON.parse(sessionStorage.getItem('shuffleTracksRef') || 'false');
};

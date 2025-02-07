export const addShuffleTracksRefSessionStorage = (value: boolean) => {
  sessionStorage.setItem('shuffleTracksRef', JSON.stringify(value));
};

export const addToPriorityQueue = (
  // prettier-ignore
  setPriorityQueue: React.Dispatch<React.SetStateAction<SpotifyApi.TrackObjectFull[]>>,
  //prettier-ignore
  track: SpotifyApi.TrackObjectFull,
) => {
  setPriorityQueue(prevQueue => [...prevQueue, track]);
};

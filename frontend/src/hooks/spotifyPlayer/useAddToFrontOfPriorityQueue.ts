import { useQueueContext } from '../context/useQueueContext';

export const useAddToFrontOfPriorityQueue = () => {
  const { setPriorityQueue } = useQueueContext();
  const addToFrontOfPriorityQueue = (track: SpotifyApi.TrackObjectFull) => {
    setPriorityQueue(prevQueue => {
      const newQueue = [track, ...prevQueue];
      return newQueue;
    });
  };
  return addToFrontOfPriorityQueue;
};

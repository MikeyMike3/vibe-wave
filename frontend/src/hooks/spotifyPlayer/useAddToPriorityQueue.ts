import { useQueueContext } from '../context/useQueueContext';

export const useAddToPriorityQueue = () => {
  const { setPriorityQueue } = useQueueContext();

  const addToPriorityQueue = (track: SpotifyApi.TrackObjectFull) => {
    setPriorityQueue(prevQueue => [...prevQueue, track]);
  };

  return addToPriorityQueue;
};

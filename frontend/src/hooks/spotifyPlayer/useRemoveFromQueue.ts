import { useQueueContext } from '../../hooks/context/useQueueContext';

export const useRemoveFromQueue = () => {
  const { setPlaylistQueue, playlistQueue, priorityQueue, setPriorityQueue } = useQueueContext();
  const removeFromQueue = (name: string | undefined, priorityQueueBool: boolean | undefined) => {
    if (priorityQueueBool) {
      const indexToRemove = priorityQueue.findIndex(item => item.name === name);
      setPriorityQueue(prevQueue => {
        const tempQueue = prevQueue.filter((_, index) => index !== indexToRemove);
        return tempQueue;
      });
    } else {
      const indexToRemove = playlistQueue.findIndex(item => item.track?.name === name);
      setPlaylistQueue(prevQueue => {
        const tempQueue = prevQueue.filter((_, index) => index !== indexToRemove);
        return tempQueue;
      });
    }
  };
  return removeFromQueue;
};

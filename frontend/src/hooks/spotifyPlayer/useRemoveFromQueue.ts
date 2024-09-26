import { useQueueContext } from '../../hooks/context/useQueueContext';

type Options = {
  shouldIndexPlaylistQueue?: boolean;
  shouldIndexPriorityQueue?: boolean;
};

export const useRemoveFromQueue = () => {
  const { setPlaylistQueue, playlistQueue, priorityQueue, setPriorityQueue } = useQueueContext();
  const removeFromQueue = (name: string | undefined, options: Options = {}) => {
    const { shouldIndexPlaylistQueue = false, shouldIndexPriorityQueue = false } = options;

    if (!shouldIndexPlaylistQueue && !shouldIndexPriorityQueue) {
      console.error('No options were selected. You must select an option.');
      return;
    }

    if (shouldIndexPriorityQueue && priorityQueue) {
      const indexToRemove = priorityQueue.findIndex(item => item.name === name);
      setPriorityQueue(prevQueue => {
        const tempQueue = prevQueue.filter((_, index) => index !== indexToRemove);
        return tempQueue;
      });
    } else if (shouldIndexPlaylistQueue) {
      const indexToRemove = playlistQueue.findIndex(item => item.track?.name === name);
      setPlaylistQueue(prevQueue => {
        const tempQueue = prevQueue.filter((_, index) => index !== indexToRemove);
        return tempQueue;
      });
    }
  };
  return removeFromQueue;
};

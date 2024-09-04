import { useQueueContext } from '../../hooks/context/useQueueContext';

export const useRemoveFromQueue = () => {
  const { setPlaylistQueue, playlistQueue } = useQueueContext();
  const removeFromQueue = (name: string | undefined) => {
    const indexToRemove = playlistQueue.findIndex(item => item.track?.name === name);
    setPlaylistQueue(prevQueue => {
      const tempQueue = prevQueue.filter((_, index) => index !== indexToRemove);
      return tempQueue;
    });
  };
  return removeFromQueue;
};

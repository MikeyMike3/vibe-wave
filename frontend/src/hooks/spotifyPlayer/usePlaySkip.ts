import { useQueueContext } from '../context/useQueueContext';
import { useIndexPlaylistQueue } from './useIndexPlaylistQueue';
import { usePlaySong } from './usePlaySong';

export const usePlaySkip = () => {
  const { playlistQueue, playlistQueueIndexRef, priorityQueue, setPriorityQueue } =
    useQueueContext();
  const playSong = usePlaySong();
  const indexPlaylistQueue = useIndexPlaylistQueue();

  const playSkip = (name: string | undefined, priorityQueueBool: boolean | undefined) => {
    if (priorityQueueBool && priorityQueue) {
      const indexToPlayAndRemove = priorityQueue.findIndex(item => item.name === name);
      playSong(priorityQueue[indexToPlayAndRemove].uri);
      setPriorityQueue(prevQueue => {
        const tempQueue = prevQueue.filter((_, index) => index !== indexToPlayAndRemove);
        return tempQueue;
      });
    } else {
      const index = playlistQueue.findIndex(item => item.track?.name === name);
      indexPlaylistQueue(index, 'set');
      playSong(playlistQueue[playlistQueueIndexRef.current].track?.uri);
    }
  };
  return playSkip;
};

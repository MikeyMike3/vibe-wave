import { useQueueContext } from '../context/useQueueContext';
import { useIndexPlaylistQueue } from './useIndexPlaylistQueue';
import { usePlaySong } from './usePlaySong';

export const usePlaySkip = () => {
  const { playlistQueue, playlistQueueIndexRef } = useQueueContext();
  const playSong = usePlaySong();
  const indexPlaylistQueue = useIndexPlaylistQueue();

  const playSkip = (name: string | undefined) => {
    const index = playlistQueue.findIndex(item => item.track?.name === name);
    indexPlaylistQueue(index, 'set');
    playSong(playlistQueue[playlistQueueIndexRef.current].track?.uri);
  };
  return playSkip;
};

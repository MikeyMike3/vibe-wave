import { useQueueContext } from '../context/useQueueContext';

export const useIndexPlaylistQueue = () => {
  const { setPlaylistQueueIndex, playlistQueueIndexRef } = useQueueContext();
  const indexPlaylistQueue = (indexTo: number, arithmetic: '+' | '-' | 'set') => {
    if (arithmetic === 'set') {
      playlistQueueIndexRef.current = indexTo;
      setPlaylistQueueIndex(playlistQueueIndexRef.current);
    } else if (arithmetic === '+') {
      playlistQueueIndexRef.current += indexTo;
      setPlaylistQueueIndex(playlistQueueIndexRef.current);
    } else if (arithmetic === '-') {
      playlistQueueIndexRef.current -= indexTo;
      setPlaylistQueueIndex(playlistQueueIndexRef.current);
    }
  };

  return indexPlaylistQueue;
};

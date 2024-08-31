import { useQueueContext } from '../context/useQueueContext';

export const useIndexPlaylistQueue = () => {
  const { setPlaylistQueueIndex, playlistQueueIndexRef } = useQueueContext();
  const indexPlaylistQueue = (
    indexTo: number,
    arithmetic: '+' | '-' | 'set',
    arrayLength?: number,
  ) => {
    if (arrayLength) {
      if (arithmetic === '+') {
        playlistQueueIndexRef.current += arrayLength + indexTo;
        setPlaylistQueueIndex(playlistQueueIndexRef.current);
      } else if (arithmetic === '-') {
        playlistQueueIndexRef.current -= arrayLength - indexTo;
        setPlaylistQueueIndex(playlistQueueIndexRef.current);
      }
    } else {
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
    }
  };

  return indexPlaylistQueue;
};

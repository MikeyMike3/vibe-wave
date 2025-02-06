import { addPlaylistQueueIndexRefToSessionStorage } from '../../functions/sessionStorage/playlistQueue/addPlaylistQueueIndexRefToSessionStorage';
import { useQueueContext } from '../context/useQueueContext';

export const useIndexPlaylistQueue = () => {
  const { setPlaylistQueueIndex, playlistQueueIndexRef } = useQueueContext();
  const indexPlaylistQueue = (indexTo: number, arithmetic: '+' | '-' | 'set') => {
    if (arithmetic === 'set') {
      playlistQueueIndexRef.current = indexTo;
      addPlaylistQueueIndexRefToSessionStorage(playlistQueueIndexRef.current);
      setPlaylistQueueIndex(playlistQueueIndexRef.current);
    } else if (arithmetic === '+') {
      playlistQueueIndexRef.current += indexTo;
      addPlaylistQueueIndexRefToSessionStorage(playlistQueueIndexRef.current);
      setPlaylistQueueIndex(playlistQueueIndexRef.current);
    } else if (arithmetic === '-') {
      playlistQueueIndexRef.current -= indexTo;
      addPlaylistQueueIndexRefToSessionStorage(playlistQueueIndexRef.current);
      setPlaylistQueueIndex(playlistQueueIndexRef.current);
    }
  };

  return indexPlaylistQueue;
};

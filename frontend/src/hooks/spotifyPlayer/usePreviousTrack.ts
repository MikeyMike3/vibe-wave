import { usePlaySong } from './usePlaySong';
import { useQueueContext } from '../context/useQueueContext';

export const usePreviousTrack = () => {
  const { playlistQueue, playlistQueueIndexRef } = useQueueContext();
  const playSong = usePlaySong();
  const previousTrack = () => {
    if (playlistQueue.length > 0 && playlistQueueIndexRef.current > 1) {
      // playlistQueueIndexRef.current must be subtracted by 2
      playlistQueueIndexRef.current -= 2;
      console.log(playlistQueueIndexRef.current);
      playSong(playlistQueue[playlistQueueIndexRef.current].track?.uri);
    }
  };

  return previousTrack;
};

import { usePlaySong } from './usePlaySong';
import { useQueueContext } from '../context/useQueueContext';
import { usePlaybackContext } from '../context/usePlaybackContext';

export const usePreviousTrack = () => {
  const { playlistQueue, playlistQueueIndexRef } = useQueueContext();
  const { repeatRef, setRepeat } = usePlaybackContext();
  const playSong = usePlaySong();
  const previousTrack = () => {
    if (repeatRef.current === 2) {
      repeatRef.current = 1;
      setRepeat(1);
    }

    // sets the playlistQueueIndexRef to the last song of the playlist
    if (repeatRef.current === 1 && playlistQueueIndexRef.current <= 1) {
      playlistQueueIndexRef.current = playlistQueue.length + 1;
    }

    if (playlistQueue.length > 0 && playlistQueueIndexRef.current > 1) {
      // playlistQueueIndexRef.current must be subtracted by 2 to be able to play the previous song
      playlistQueueIndexRef.current -= 2;
      playSong(playlistQueue[playlistQueueIndexRef.current].track?.uri);
    }
  };

  return previousTrack;
};

import { usePlaySong } from './usePlaySong';
import { useQueueContext } from '../context/useQueueContext';

type usePreviousTrackProps = {
  uri: string | undefined;
};

export const usePreviousTrack = ({ uri }: usePreviousTrackProps) => {
  const { playlistQueue, playlistQueueIndexRef } = useQueueContext();
  const playSong = usePlaySong();
  const previousTrack = () => {
    if (playlistQueue.length > 0) {
      playlistQueueIndexRef.current--;
      playSong(uri);
    }
  };

  return previousTrack;
};

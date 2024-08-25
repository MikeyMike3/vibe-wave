import { useQueueContext } from '../../hooks/context/useQueueContext';
import { useSpotifyPlayerContext } from '../../hooks/context/useSpotifyPlayerContext';
import { playSong } from '../../functions/spotifyPlayer/playSong';

export const useNextTrack = () => {
  const { priorityQueue, setPriorityQueue } = useQueueContext();
  const { player, deviceId } = useSpotifyPlayerContext();

  const nextTrack = () => {
    if (priorityQueue.length > 0) {
      setPriorityQueue(prevQueue => prevQueue.slice(1));
      playSong(player, deviceId, priorityQueue[0].uri);
    }
  };
  return nextTrack;
};

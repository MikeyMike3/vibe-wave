import { useQueueContext } from '../context/useQueueContext';
import { useSpotifyPlayerContext } from '../context/useSpotifyPlayerContext';
import { playSong } from '../../functions/spotifyPlayer/playSong';
import { useEffect } from 'react';

export const useNextTrack = () => {
  const { priorityQueue, setPriorityQueue, playlistQueue, setPlaylistQueue } = useQueueContext();
  const { player, deviceId } = useSpotifyPlayerContext();

  const nextTrack = () => {
    if (priorityQueue.length > 0) {
      setPriorityQueue(prevQueue => prevQueue.slice(1));
      playSong(player, deviceId, priorityQueue[0].uri);
    } else if (playlistQueue.length > 0) {
      setPlaylistQueue(prevQueue => prevQueue.slice(1));
      playSong(player, deviceId, playlistQueue[0]?.track?.uri);
    }
  };
  useEffect(() => {
    console.log(playlistQueue);
  }, [playlistQueue]);
  return nextTrack;
};

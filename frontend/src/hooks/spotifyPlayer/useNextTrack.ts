import { useQueueContext } from '../context/useQueueContext';
import { usePlaySong } from './usePlaySong';
import { useEffect } from 'react';

export const useNextTrack = () => {
  const { priorityQueue, setPriorityQueue, playlistQueue, playlistQueueIndexRef } =
    useQueueContext();
  const playSong = usePlaySong();

  const nextTrack = () => {
    if (priorityQueue.length > 0) {
      setPriorityQueue(prevQueue => prevQueue.slice(1));
      playSong(priorityQueue[0].uri);
    } else if (playlistQueue.length > 0) {
      // the index logic is handled within the SpotifyPlayer Component in the 'player_state_changed' listener
      // the index gets 1 added to it whenever the song changes
      playSong(playlistQueue[playlistQueueIndexRef.current]?.track?.uri);
    }
  };
  useEffect(() => {
    console.log(playlistQueue);
  }, [playlistQueue]);
  return nextTrack;
};

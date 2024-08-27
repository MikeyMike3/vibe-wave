import { usePlaybackContext } from '../context/usePlaybackContext';
import { useQueueContext } from '../context/useQueueContext';
import { useSpotifyPlayerContext } from '../context/useSpotifyPlayerContext';
import { usePlaySong } from './usePlaySong';
import { useEffect } from 'react';

export const useNextTrack = () => {
  const { priorityQueue, setPriorityQueue, playlistQueue, playlistQueueIndexRef } =
    useQueueContext();
  const { isPausedRef } = useSpotifyPlayerContext();
  const { repeatRef, setRepeat, userSkippedTrackRef } = usePlaybackContext();
  const playSong = usePlaySong();

  const nextTrack = () => {
    isPausedRef.current = false;
    userSkippedTrackRef.current = true;

    if (repeatRef.current === 2) {
      repeatRef.current = 1;
      setRepeat(1);
    }

    if (priorityQueue.length > 0) {
      setPriorityQueue(prevQueue => prevQueue.slice(1));
      playSong(priorityQueue[0].uri);
    } else if (playlistQueue.length > 0) {
      // this logic is an extension of the 'player_state_changed' listener
      // this pauses the first song of the queue if the queue has finished playing
      if (playlistQueueIndexRef.current === playlistQueue.length) {
        playlistQueueIndexRef.current = 0;
        if (repeatRef.current !== 1) {
          isPausedRef.current = true;
        }
      }
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

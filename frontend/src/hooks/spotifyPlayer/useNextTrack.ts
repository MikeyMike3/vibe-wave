import { removeFirstFromPriorityQueueSessionData } from '../../functions/sessionStorage/priorityQueue/removeFirstFromPriorityQueueSessionData';
import { isPlaylistTrackObjectArray } from '../../types/typeGuards/isPlaylistTrackObjectArray';
import { isSingleAlbumResponse } from '../../types/typeGuards/isSIngleAlbumResponse';
import { usePlaybackContext } from '../context/usePlaybackContext';
import { useQueueContext } from '../context/useQueueContext';
import { useIndexPlaylistQueue } from './useIndexPlaylistQueue';
import { usePlaySong } from './usePlaySong';

export const useNextTrack = () => {
  const { priorityQueue, setPriorityQueue, playlistQueue, playlistQueueIndexRef } =
    useQueueContext();
  const { repeatRef, setRepeat, userSkippedTrackRef, isPausedRef } = usePlaybackContext();
  const playSongMutation = usePlaySong();
  const indexPlaylistQueue = useIndexPlaylistQueue();

  const nextTrack = () => {
    isPausedRef.current = false;
    userSkippedTrackRef.current = true;

    if (repeatRef.current === 2) {
      repeatRef.current = 1;
      setRepeat(1);
    }

    if (priorityQueue && priorityQueue.length > 0) {
      setPriorityQueue(prevQueue => {
        if (prevQueue) {
          removeFirstFromPriorityQueueSessionData();
          return prevQueue.slice(1);
        }
        return [];
      });

      playSongMutation({ uri: priorityQueue[0].uri, options: {} });
    } else if (playlistQueue) {
      if (isPlaylistTrackObjectArray(playlistQueue) && playlistQueue.length > 0) {
        // this logic is an extension of the 'player_state_changed' listener
        // this pauses the first song of the queue if the queue has finished playing
        if (playlistQueueIndexRef.current === playlistQueue.length) {
          indexPlaylistQueue(0, 'set');
          if (repeatRef.current !== 1) {
            isPausedRef.current = true;
          }
        }
      } else if (isSingleAlbumResponse(playlistQueue) && playlistQueue.tracks.items.length > 0) {
        if (playlistQueueIndexRef.current === playlistQueue.tracks.items.length) {
          indexPlaylistQueue(0, 'set');
          if (repeatRef.current !== 1) {
            isPausedRef.current = true;
          }
        }
      }

      // the index logic is handled within the SpotifyPlayer Component in the 'player_state_changed' listener
      // the index gets 1 added to it whenever the song changes
      if (isPlaylistTrackObjectArray(playlistQueue)) {
        playSongMutation({
          uri: playlistQueue[playlistQueueIndexRef.current]?.track?.uri,
          options: {},
        });
      } else if (isSingleAlbumResponse(playlistQueue)) {
        playSongMutation({
          uri: playlistQueue.tracks.items[playlistQueueIndexRef.current].uri,
          options: {},
        });
      }
    }
  };
  return nextTrack;
};

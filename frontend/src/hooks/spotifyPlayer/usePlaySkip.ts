import { useQueueContext } from '../context/useQueueContext';
import { useIndexPlaylistQueue } from './useIndexPlaylistQueue';
import { usePlaySong } from './usePlaySong';

type Options = {
  shouldIndexPlaylistQueue?: boolean;
  shouldIndexPriorityQueue?: boolean;
  shouldPlaySong?: boolean;
};

export const usePlaySkip = () => {
  const { playlistQueue, playlistQueueIndexRef, priorityQueue, setPriorityQueue } =
    useQueueContext();
  const playSong = usePlaySong();
  const indexPlaylistQueue = useIndexPlaylistQueue();

  const playSkip = (
    name: string | undefined,
    options: Options = {},
    track?: SpotifyApi.TrackObjectFull | SpotifyApi.PlaylistTrackObject,
  ) => {
    const {
      shouldIndexPlaylistQueue = false,
      shouldIndexPriorityQueue = false,
      shouldPlaySong = false,
    } = options;

    if (!shouldIndexPlaylistQueue && !shouldIndexPriorityQueue && !shouldPlaySong) {
      console.error('No Options Selected');
      return;
    }

    if (shouldPlaySong) {
      if (track && 'track' in track) {
        playSong(track.track?.uri);
      } else {
        playSong(track?.uri);
      }
      return;
    } else if (shouldIndexPriorityQueue && priorityQueue) {
      const indexToPlayAndRemove = priorityQueue.findIndex(item => item.name === name);
      playSong(priorityQueue[indexToPlayAndRemove].uri);
      setPriorityQueue(prevQueue => {
        const tempQueue = prevQueue.filter((_, index) => index !== indexToPlayAndRemove);
        return tempQueue;
      });
    } else if (shouldIndexPlaylistQueue && playlistQueue) {
      const index = playlistQueue.findIndex(item => item.track?.name === name);
      indexPlaylistQueue(index, 'set');
      playSong(playlistQueue[playlistQueueIndexRef.current].track?.uri);
      return;
    }
  };
  return playSkip;
};

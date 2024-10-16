import { AlbumTrackWithImage } from '../../types/AlbumTrackWithImage';
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
  const playSongMutation = usePlaySong();
  const indexPlaylistQueue = useIndexPlaylistQueue();

  const playSkip = (
    name: string | undefined,
    options: Options = {},
    track?: SpotifyApi.TrackObjectFull | SpotifyApi.PlaylistTrackObject | AlbumTrackWithImage,
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
        playSongMutation({ uri: track.track?.uri, options: {} });
      } else {
        playSongMutation({ uri: track?.uri, options: {} });
      }
      return;
    } else if (shouldIndexPriorityQueue && priorityQueue) {
      const indexToPlayAndRemove = priorityQueue.findIndex(item => item.name === name);
      playSongMutation({ uri: priorityQueue[indexToPlayAndRemove].uri, options: {} });
      setPriorityQueue(prevQueue => {
        if (!prevQueue) {
          return null;
        }
        const tempQueue = prevQueue.filter((_, index) => index !== indexToPlayAndRemove);
        return tempQueue.length > 0 ? tempQueue : null;
      });
    } else if (shouldIndexPlaylistQueue && playlistQueue) {
      const index = playlistQueue.findIndex(item => item.track?.name === name);
      indexPlaylistQueue(index, 'set');
      playSongMutation({
        uri: playlistQueue[playlistQueueIndexRef.current].track?.uri,
        options: {},
      });
      return;
    }
  };
  return playSkip;
};

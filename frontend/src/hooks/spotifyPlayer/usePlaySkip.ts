import { addRepeatRefSessionStorage } from '../../functions/sessionStorage/playback/repeat/addRepeatRefToSessionStorage';
import { setPriorityQueueSessionStorage } from '../../functions/sessionStorage/priorityQueue/setPriorityQueueSessionStorage';
import { AlbumTrackWithImage } from '../../types/AlbumTrackWithImage';
import { isPlaylistTrackObjectArray } from '../../types/typeGuards/isPlaylistTrackObjectArray';
import { isSingleAlbumResponse } from '../../types/typeGuards/isSIngleAlbumResponse';
import { usePlaybackContext } from '../context/usePlaybackContext';
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
  const { repeatRef, setRepeat } = usePlaybackContext();
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
    if (repeatRef.current === 2) {
      repeatRef.current = 1;
      addRepeatRefSessionStorage(1);
      setRepeat(1);
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
        setPriorityQueueSessionStorage(tempQueue);
        return tempQueue.length > 0 ? tempQueue : null;
      });
    } else if (shouldIndexPlaylistQueue && playlistQueue) {
      if (isPlaylistTrackObjectArray(playlistQueue)) {
        const index = playlistQueue.findIndex(item => item.track?.name === name);
        indexPlaylistQueue(index, 'set');
        playSongMutation({
          uri: playlistQueue[playlistQueueIndexRef.current].track?.uri,
          options: {},
        });
        return;
      } else if (isSingleAlbumResponse(playlistQueue)) {
        const index = playlistQueue.tracks.items.findIndex(item => item.name === name);
        indexPlaylistQueue(index, 'set');
        playSongMutation({
          uri: playlistQueue.tracks.items[playlistQueueIndexRef.current].uri,
          options: {},
        });
        return;
      }
    }
  };
  return playSkip;
};

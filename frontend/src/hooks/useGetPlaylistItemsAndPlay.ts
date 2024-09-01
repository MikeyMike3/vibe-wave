import { useGetPlaylistItems } from './apis/useGetPlaylistItems';
import { usePlaybackContext } from './context/usePlaybackContext';
import { useQueueContext } from './context/useQueueContext';
import { useIndexPlaylistQueue } from './spotifyPlayer/useIndexPlaylistQueue';
import { useShuffleTracks } from './spotifyPlayer/useShuffleTracks';

export const useGetPlaylistItemsAndPlay = (playlistId: string, playlistName: string) => {
  const { setPlaylistName } = usePlaybackContext();
  const { setPlaylistQueue, unShuffledQueueRef } = useQueueContext();
  const shuffleTracks = useShuffleTracks();

  const indexPlaylistQueue = useIndexPlaylistQueue();
  const getPlaylistItems = useGetPlaylistItems(playlistId);

  const getPlaylistItemsAndPlay = async () => {
    const data = await getPlaylistItems();
    setPlaylistQueue([]);
    setPlaylistQueue(data.items);
    setPlaylistName(playlistName);

    setPlaylistQueue(currentQueue => {
      if (currentQueue.length > 0) {
        indexPlaylistQueue(0, 'set');
        unShuffledQueueRef.current = currentQueue;
        shuffleTracks({ prevQueue: [...currentQueue] });
      }
      return currentQueue;
    });
  };

  return getPlaylistItemsAndPlay;
};

import { useGetPlaylistItems } from './apis/useGetPlaylistItems';
import { usePlaybackContext } from './context/usePlaybackContext';
import { useQueueContext } from './context/useQueueContext';
import { usePlaySong } from './spotifyPlayer/usePlaySong';
import { useIndexPlaylistQueue } from './spotifyPlayer/useIndexPlaylistQueue';

export const useGetPlaylistItemsAndPlay = (playlistId: string, playlistName: string) => {
  const { setPlaylistName } = usePlaybackContext();
  const { setPlaylistQueue, unShuffledQueueRef } = useQueueContext();

  const indexPlaylistQueue = useIndexPlaylistQueue();
  const getPlaylistItems = useGetPlaylistItems(playlistId);
  const playSong = usePlaySong();

  const getPlaylistItemsAndPlay = async () => {
    const data = await getPlaylistItems();
    setPlaylistQueue(data.items);
    setPlaylistName(playlistName);
    setPlaylistQueue(currentQueue => {
      if (currentQueue.length > 0) {
        playSong(currentQueue[0]?.track?.uri);
        unShuffledQueueRef.current = currentQueue;
        indexPlaylistQueue(0, 'set');
      }
      return currentQueue;
    });
  };

  return getPlaylistItemsAndPlay;
};

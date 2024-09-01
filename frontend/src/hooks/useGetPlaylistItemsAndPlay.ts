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
    setPlaylistName(playlistName);

    const data = await getPlaylistItems();
    setPlaylistQueue(data.items);
    setPlaylistQueue(currentQueue => {
      if (currentQueue.length > 0) {
        playSong(currentQueue[0]?.track?.uri);
        unShuffledQueueRef.current = currentQueue;
        indexPlaylistQueue(0, 'set');
      }
      console.log(currentQueue);
      return currentQueue;
    });
  };

  return getPlaylistItemsAndPlay;
};

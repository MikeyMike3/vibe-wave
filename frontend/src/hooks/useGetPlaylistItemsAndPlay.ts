import { useGetPlaylistItems } from './apis/useGetPlaylistItems';
import { usePlaybackContext } from './context/usePlaybackContext';
import { useQueueContext } from './context/useQueueContext';
import { useIndexPlaylistQueue } from './spotifyPlayer/useIndexPlaylistQueue';
import { usePlaySong } from './spotifyPlayer/usePlaySong';
import { useShuffleTracks } from './spotifyPlayer/useShuffleTracks';

export const useGetPlaylistItemsAndPlay = (playlistId: string, playlistName: string) => {
  const { setPlaylistName, shuffleTracksRef } = usePlaybackContext();
  const { setPlaylistQueue, unShuffledQueueRef } = useQueueContext();
  const shuffleTracks = useShuffleTracks();
  const playSong = usePlaySong();

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
        if (!shuffleTracksRef.current) {
          playSong(currentQueue[0].track?.uri, { tempQueue: currentQueue });
        }
      }
      return currentQueue;
    });
  };

  return getPlaylistItemsAndPlay;
};

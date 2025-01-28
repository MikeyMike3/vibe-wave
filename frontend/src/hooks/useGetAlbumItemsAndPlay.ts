import { useFetchAlbum } from './apis/useFetchAlbum';
import { useQueueContext } from './context/useQueueContext';
import { isSingleAlbumResponse } from '../types/typeGuards/isSIngleAlbumResponse';
import { usePlaybackContext } from './context/usePlaybackContext';
import { useIndexPlaylistQueue } from './spotifyPlayer/useIndexPlaylistQueue';
import { usePlaySong } from './spotifyPlayer/usePlaySong';
import { useShuffleTracks } from './spotifyPlayer/useShuffleTracks';

export const useGetAlbumItemsAndPlay = (albumId: string, albumName: string) => {
  const { album } = useFetchAlbum(albumId);
  const { setPlaylistName, shuffleTracksRef, repeatRef, setRepeat } = usePlaybackContext();
  const { setPlaylistQueue, unShuffledQueueRef } = useQueueContext();
  const shuffleTracks = useShuffleTracks();
  const playSongMutation = usePlaySong();
  const indexPlaylistQueue = useIndexPlaylistQueue();

  const getAlbumItemsAndPlay = () => {
    setPlaylistQueue([]);
    setPlaylistQueue(album);
    setPlaylistName(albumName);

    if (repeatRef.current === 2) {
      setRepeat(1);
      repeatRef.current = 1;
    }

    setPlaylistQueue(currentQueue => {
      if (currentQueue) {
        if (isSingleAlbumResponse(currentQueue)) {
          if (currentQueue.tracks.items.length > 0) {
            indexPlaylistQueue(0, 'set');
            unShuffledQueueRef.current = currentQueue;
            if (shuffleTracksRef.current) {
              shuffleTracks({ prevQueue: currentQueue });
            }
            if (!shuffleTracksRef.current) {
              playSongMutation({
                uri: currentQueue.tracks.items[0].uri,
                options: { tempQueue: currentQueue },
              });
            }
          }
        } else {
          console.error('Wrong type is specified');
        }
      }

      return currentQueue;
    });
  };

  return getAlbumItemsAndPlay;
};

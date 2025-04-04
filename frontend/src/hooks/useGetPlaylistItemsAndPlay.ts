import { useQuery } from '@tanstack/react-query';
import { usePlaybackContext } from './context/usePlaybackContext';
import { useQueueContext } from './context/useQueueContext';
import { useShuffleTracks } from './spotifyPlayer/useShuffleTracks';
import { usePlaySong } from './spotifyPlayer/usePlaySong';
import { useIndexPlaylistQueue } from './spotifyPlayer/useIndexPlaylistQueue';
import { useHeaders } from './apis/useHeaders';
import { isPlaylistTrackObjectArray } from '../types/typeGuards/isPlaylistTrackObjectArray';
import { addToPlaylistQueueSessionStorage } from '../functions/sessionStorage/playlistQueue/addToPlaylistQueueSessionStorage';
import { addUnShuffledQueueRefSessionStorage } from '../functions/sessionStorage/playback/shuffle/addUnShuffledQueueRefSessionStorage';
import { addRepeatRefSessionStorage } from '../functions/sessionStorage/playback/repeat/addRepeatRefToSessionStorage';

export const useGetPlaylistItemsAndPlay = (playlistId: string, playlistName: string) => {
  const { setPlaylistName, shuffleTracksRef, repeatRef, setRepeat, setPlaylistId } =
    usePlaybackContext();
  const { setPlaylistQueue, unShuffledQueueRef } = useQueueContext();
  const shuffleTracks = useShuffleTracks();
  const playSongMutation = usePlaySong();
  const indexPlaylistQueue = useIndexPlaylistQueue();

  const apiHeaders = useHeaders();

  //prettier-ignore
  const fetchPlaylistItems = async (): Promise<SpotifyApi.PlaylistTrackResponse> => {
    const response = await fetch(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`, apiHeaders);

    if (!response.ok) {
      throw new Error('Error fetching playlist items');
    }

    const data: SpotifyApi.PlaylistTrackResponse = await response.json();
    let allPlaylistItems = [...data.items];
    const playlistItemsMissing: number = data.total - data.items.length;
    const loopsRequired: number = Math.ceil(playlistItemsMissing / data.limit);

 
    for (let i = 1; i <= loopsRequired; i++) {
      const nextPageResponse = await fetch(
        `https://api.spotify.com/v1/playlists/${playlistId}/tracks?offset=${i * data.limit}`,
        apiHeaders,
      );

      if (!nextPageResponse.ok) {
        throw new Error('Error fetching additional playlist items');
      }

      const nextPageData: SpotifyApi.PlaylistTrackResponse = await nextPageResponse.json();
      allPlaylistItems = allPlaylistItems.concat(nextPageData.items);
    }

    return { ...data, items: allPlaylistItems };
  };

  const { refetch } = useQuery<SpotifyApi.PlaylistTrackResponse>({
    queryKey: ['playlistItems', playlistId],
    queryFn: fetchPlaylistItems,
    enabled: false,
    refetchOnWindowFocus: false,
  });

  const getPlaylistItemsAndPlay = async () => {
    const data = await refetch();

    if (data.data) {
      setPlaylistQueue([]);
      setPlaylistQueue(data.data.items);
      setPlaylistName(playlistName);
      setPlaylistId(playlistId);

      if (repeatRef.current === 2) {
        setRepeat(1);
        addRepeatRefSessionStorage(1);
        repeatRef.current = 1;
      }

      setPlaylistQueue(currentQueue => {
        if (currentQueue && isPlaylistTrackObjectArray(currentQueue) && currentQueue.length > 0) {
          indexPlaylistQueue(0, 'set');
          unShuffledQueueRef.current = currentQueue;
          addUnShuffledQueueRefSessionStorage(unShuffledQueueRef);
          if (shuffleTracksRef.current) {
            shuffleTracks({ prevQueue: [...currentQueue] });
            return;
          }
          if (!shuffleTracksRef.current) {
            playSongMutation({
              uri: currentQueue[0].track?.uri,
              options: { tempQueue: currentQueue },
            });
          }
        } else {
          console.error(
            'This custom hook is being used in the wrong place. Ensure that this is only being used for getting and playing playlist tracks, not saved tracks or anything else.',
          );
        }
        addToPlaylistQueueSessionStorage(currentQueue);
        return currentQueue;
      });
    }
  };

  return { getPlaylistItemsAndPlay };
};

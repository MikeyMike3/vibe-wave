import { useQuery } from '@tanstack/react-query';
import { usePlaybackContext } from './context/usePlaybackContext';
import { useQueueContext } from './context/useQueueContext';
import { useShuffleTracks } from './spotifyPlayer/useShuffleTracks';
import { usePlaySong } from './spotifyPlayer/usePlaySong';
import { useIndexPlaylistQueue } from './spotifyPlayer/useIndexPlaylistQueue';
import { useHeaders } from './apis/useHeaders';

export const useGetPlaylistItemsAndPlay = (playlistId: string, playlistName: string) => {
  const { setPlaylistName, shuffleTracksRef } = usePlaybackContext();
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

      setPlaylistQueue(currentQueue => {
        if (currentQueue.length > 0) {
          indexPlaylistQueue(0, 'set');
          unShuffledQueueRef.current = currentQueue;
          if (shuffleTracksRef.current) {
            shuffleTracks({ prevQueue: [...currentQueue] });
          }
          if (!shuffleTracksRef.current) {
            playSongMutation({
              uri: currentQueue[0].track?.uri,
              options: { tempQueue: currentQueue },
            });
          }
        }

        return currentQueue;
      });
    }
  };

  return { getPlaylistItemsAndPlay };
};

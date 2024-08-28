import { useQueueContext } from '../context/useQueueContext';
import { useHeaders } from './useHeaders';

export const useGetPlaylistItems = (playlistId: string) => {
  const { setPlaylistQueue, unShuffledQueueRef } = useQueueContext();
  const accessToken = sessionStorage.getItem('accessToken');
  const apiHeaders = useHeaders(accessToken);

  const getPlaylistItems = async () => {
    try {
      const response = await fetch(
        `https://api.spotify.com/v1/playlists/${playlistId}/tracks`,
        apiHeaders,
      );

      if (response.ok) {
        const data = await response.json();
        setPlaylistQueue(data.items);
        unShuffledQueueRef.current = data.items;
      }
    } catch (error) {
      console.error(error);
    }
  };
  return getPlaylistItems;
};

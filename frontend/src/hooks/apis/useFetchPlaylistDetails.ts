import { useQuery } from '@tanstack/react-query';
import { useHeaders } from './useHeaders';

export const useFetchPlaylistDetails = (playlistId: number) => {
  const accessToken = sessionStorage.getItem('accessToken');
  const apiHeaders = useHeaders(accessToken);
  const fetchPlaylistDetails = async () => {
    try {
      const response = await fetch(
        `https://api.spotify.com/v1/playlists/${playlistId}?fields=name,owner(display_name),images,description`,
        apiHeaders,
      );

      if (response.ok) {
        const data = await response.json();
        return data;
      } else {
        throw new Error('Error fetching playlist details');
      }
    } catch (e) {
      console.error('Error fetching playlist details', e);
    }
  };

  return useQuery({
    queryKey: ['playlistDetails'],
    queryFn: fetchPlaylistDetails,
    enabled: !!accessToken,
  });
};

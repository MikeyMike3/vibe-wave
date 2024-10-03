import { useQuery } from '@tanstack/react-query';
import { useHeaders } from './useHeaders';

type PlaylistDetails = {
  name: string;
  owner: {
    display_name: string;
  };
  images: {
    url: string;
    height: number | null;
    width: number | null;
  }[];
  description: string;
};

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
        const data: PlaylistDetails = await response.json();
        return data;
      } else {
        throw new Error('Error fetching playlist details');
      }
    } catch (error) {
      console.error('Error fetching playlist details', error);
      throw error;
    }
  };

  const {
    data: playlistDetails,
    error,
    isLoading,
  } = useQuery({
    queryKey: ['playlistDetails', playlistId],
    queryFn: fetchPlaylistDetails,
    enabled: !!accessToken,
  });

  return { playlistDetails, error, isLoading };
};

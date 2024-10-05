import { useQuery } from '@tanstack/react-query';
import { useHeaders } from './useHeaders';

export const useFetchSavedAlbums = () => {
  const accessToken = sessionStorage.getItem('accessToken');
  const apiHeader = useHeaders(accessToken);
  const fetchSavedAlbums = async () => {
    try {
      const response = await fetch('https://api.spotify.com/v1/me/albums', apiHeader);

      if (!response.ok) {
        throw new Error('Error fetching saved albums');
      }
      const data = await response.json();
      return data;
    } catch (error) {
      throw error;
    }
  };
  const {
    data: savedAlbums,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['savedAlbums'],
    queryFn: fetchSavedAlbums,
    enabled: !!accessToken,
  });

  return { savedAlbums, isError, isLoading };
};

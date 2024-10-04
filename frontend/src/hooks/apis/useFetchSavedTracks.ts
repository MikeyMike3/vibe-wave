import { useQuery } from '@tanstack/react-query';
import { useHeaders } from './useHeaders';

export const useFetchSavedTracks = () => {
  const accessToken = sessionStorage.getItem('accessToken');
  const apiHeaders = useHeaders(accessToken);
  const fetchSavedTracks = async () => {
    try {
      const response = await fetch('https://api.spotify.com/v1/me/tracks', apiHeaders);

      if (!response.ok) {
        throw new Error('An error occurred when fetching saved tracks');
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('An error occurred when fetching saved tracks', error);
      throw error;
    }
  };

  const {
    data: savedTracks,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['savedTracks'],
    queryFn: fetchSavedTracks,
    enabled: !!accessToken,
  });
  return { savedTracks, isLoading, isError };
};

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
      const data: SpotifyApi.UsersSavedTracksResponse = await response.json();
      let allPlaylistItems = [...data.items];
      const playlistItemsMissing: number = data.total - data.items.length;
      const loopsRequired: number = Math.ceil(playlistItemsMissing / data.limit);

      for (let i = 1; i <= loopsRequired; i++) {
        const nextPageResponse = await fetch(
          `https://api.spotify.com/v1/me/tracks?offset=${i * data.limit}`,
          apiHeaders,
        );

        if (!nextPageResponse.ok) {
          throw new Error('Error fetching additional saved tracks');
        }

        const nextPageData: SpotifyApi.UsersSavedTracksResponse = await nextPageResponse.json();
        allPlaylistItems = allPlaylistItems.concat(nextPageData.items);
      }

      return { ...data, items: allPlaylistItems };
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

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
      //prettier-ignore
      const data:SpotifyApi.PagingObject<SpotifyApi.SavedAlbumObject> = await response.json();
      let allSavedAlbums = [...data.items];
      const SavedAlbumsMissing: number = data.total - data.items.length;
      const loopsRequired: number = Math.ceil(SavedAlbumsMissing / data.limit);

      for (let i = 1; i <= loopsRequired; i++) {
        const nextPageResponse = await fetch(
          `https://api.spotify.com/v1/me/albums?offset=${i * data.limit}`,
          apiHeader,
        );

        if (!nextPageResponse.ok) {
          throw new Error('Error fetching additional saved Albums');
        }
        //prettier-ignore
        const nextPageData: SpotifyApi.PagingObject<SpotifyApi.SavedAlbumObject> = await nextPageResponse.json();
        allSavedAlbums = allSavedAlbums.concat(nextPageData.items);
      }

      return { ...data, items: allSavedAlbums };
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

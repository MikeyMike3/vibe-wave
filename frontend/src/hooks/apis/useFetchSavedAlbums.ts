import { useQuery } from '@tanstack/react-query';
import { useHeaders } from './useHeaders';

export const useFetchSavedAlbums = () => {
  const apiHeader = useHeaders();
  const fetchSavedAlbums = async () => {
    const response = await fetch('https://api.spotify.com/v1/me/albums', apiHeader);

    if (!response.ok) {
      throw new Error('Error fetching saved albums');
    }

    const data: SpotifyApi.PagingObject<SpotifyApi.SavedAlbumObject> = await response.json();
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

      const nextPageData: SpotifyApi.PagingObject<SpotifyApi.SavedAlbumObject> =
        await nextPageResponse.json();
      allSavedAlbums = allSavedAlbums.concat(nextPageData.items);
      return { ...data, items: allSavedAlbums };
    }
  };
  const {
    data: savedAlbums,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['savedAlbums'],
    queryFn: fetchSavedAlbums,
  });

  return { savedAlbums, isError, isLoading };
};

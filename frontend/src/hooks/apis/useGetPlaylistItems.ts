import { useQuery } from '@tanstack/react-query';
import { useHeaders } from './useHeaders';

export const useGetPlaylistItems = (playlistId: string | undefined) => {
  const apiHeaders = useHeaders();

  //prettier-ignore
  const fetchPlaylistItems = async (): Promise<SpotifyApi.PlaylistTrackResponse> => {
    const response = await fetch(
      `https://api.spotify.com/v1/playlists/${playlistId}/tracks`,
      apiHeaders,
    );

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

  const {
    data: playlistItems,
    isLoading,
    isError,
  } = useQuery<SpotifyApi.PlaylistTrackResponse>({
    queryKey: ['playlistItems', playlistId],
    queryFn: fetchPlaylistItems,
    enabled: !!playlistId,
    refetchOnWindowFocus: false,
  });

  return { playlistItems, isLoading, isError };
};

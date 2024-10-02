import { useEffect, useState } from 'react';
import { useHeaders } from './useHeaders';

export const useGetPlaylistItems = (playlistId: string | undefined, updateState?: boolean) => {
  const [playlistItems, setPlaylistItems] = useState<SpotifyApi.PlaylistTrackResponse>();
  const accessToken = sessionStorage.getItem('accessToken');
  const apiHeaders = useHeaders(accessToken);

  useEffect(() => {
    const getPlaylistItems = async () => {
      try {
        const response = await fetch(
          `https://api.spotify.com/v1/playlists/${playlistId}/tracks`,
          apiHeaders,
        );

        if (response.ok) {
          const data = await response.json();
          let allPlaylistItems = [...data.items];
          const playlistItemsMissing: number = data.total - data.items.length;
          const loopsRequired: number = Math.ceil(playlistItemsMissing / data.limit);

          for (let i = 1; i <= loopsRequired; i++) {
            const nextPageResponse = await fetch(
              `https://api.spotify.com/v1/playlists/${playlistId}/tracks?offset=${i * data.limit}`,
              apiHeaders,
            );

            if (nextPageResponse.status === 200) {
              // prettier-ignore
              const nextPageData: SpotifyApi.PagingObject<SpotifyApi.PlaylistObjectSimplified> = await nextPageResponse.json();
              allPlaylistItems = allPlaylistItems.concat(nextPageData.items);
            } else {
              throw new Error('Error fetching additional playlists');
            }
          }

          setPlaylistItems({
            ...data,
            items: allPlaylistItems,
          });
          return data;
        }
      } catch (error) {
        console.error(error);
      }
    };

    if (updateState) {
      getPlaylistItems();
    }
  }, [apiHeaders, playlistId, updateState]);

  return { playlistItems };
};

import { useEffect, useState } from 'react';
import { useHeaders } from '../../hooks/apis/useHeaders';

export const useFetchUserPlaylists = () => {
  //prettier-ignore
  const [userPlaylists, setUserPlaylists] = useState<SpotifyApi.PagingObject<SpotifyApi.PlaylistObjectSimplified>>();
  const [isUserPlaylistsLoading, setIsUserPlaylistsLoading] = useState(true);
  const [isUserPlaylistsError, setIsUserPlaylistsError] = useState(false);
  const accessToken = sessionStorage.getItem('accessToken');
  const apiHeaders = useHeaders(accessToken);

  useEffect(() => {
    const fetchUserPlaylists = async () => {
      try {
        const response = await fetch('https://api.spotify.com/v1/me/playlists', apiHeaders);
        if (response.status === 200) {
          // prettier-ignore
          const data: SpotifyApi.PagingObject<SpotifyApi.PlaylistObjectSimplified> = await response.json();

          let allPlaylists = [...data.items];
          const playlistsMissing: number = data.total - data.items.length;
          const loopsRequired: number = Math.ceil(playlistsMissing / data.limit);

          for (let i = 1; i <= loopsRequired; i++) {
            const nextPageResponse = await fetch(
              `https://api.spotify.com/v1/me/playlists?offset=${i * data.limit}`,
              apiHeaders,
            );

            if (nextPageResponse.status === 200) {
              // prettier-ignore
              const nextPageData: SpotifyApi.PagingObject<SpotifyApi.PlaylistObjectSimplified> = await nextPageResponse.json();
              allPlaylists = allPlaylists.concat(nextPageData.items);
            } else {
              throw new Error('Error fetching additional playlists');
            }
          }

          setUserPlaylists({
            ...data,
            items: allPlaylists,
          });
        } else {
          setIsUserPlaylistsError(true);
          throw new Error('Error fetching playlists');
        }
      } catch (error) {
        setIsUserPlaylistsError(true);
        console.error(error);
      } finally {
        setIsUserPlaylistsLoading(false);
      }
    };

    if (accessToken) {
      fetchUserPlaylists();
    }
  }, [accessToken, apiHeaders]);
  return { userPlaylists, isUserPlaylistsLoading, isUserPlaylistsError };
};

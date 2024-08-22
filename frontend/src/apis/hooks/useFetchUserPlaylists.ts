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
          //prettier-ignore
          const data: SpotifyApi.PagingObject<SpotifyApi.PlaylistObjectSimplified> = await response.json();
          setUserPlaylists(data);
        } else {
          setIsUserPlaylistsError(true);
          throw new Error();
        }
      } catch {
        setIsUserPlaylistsError(true);
        throw new Error();
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

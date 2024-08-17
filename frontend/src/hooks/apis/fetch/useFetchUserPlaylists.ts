import { useEffect, useState } from 'react';
import { CurrentUserPlaylist } from '../../../types/playlists/currentUserPlaylist';
import { useHeaders } from '../useHeaders';

export const useFetchUserPlaylists = () => {
  const [userPlaylists, setUserPlaylists] = useState<CurrentUserPlaylist>();
  const [isUserPlaylistsLoading, setIsUserPlaylistsLoading] = useState(true);
  const [isUserPlaylistsError, setIsUserPlaylistsError] = useState(false);
  const accessToken = sessionStorage.getItem('accessToken');
  const apiHeaders = useHeaders(accessToken);

  useEffect(() => {
    const fetchUserPlaylists = async () => {
      try {
        const response = await fetch('https://api.spotify.com/v1/me/playlists', apiHeaders);
        if (response.status === 200) {
          const data: CurrentUserPlaylist = await response.json();
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

import { useContext, useEffect, useState } from 'react';
import { useHeaders } from '../hooks/useHeaders';
import { CurrentUserPlaylist } from '../types/playlists/currentUserPlaylist';
import { AuthContext } from '../context/AuthContext';

export const Home = () => {
  const authContext = useContext(AuthContext);
  const [userPlaylists, setUserPlaylists] = useState<CurrentUserPlaylist>();

  if (!authContext) {
    throw new Error('Profile must be used within an AuthProvider');
  }

  const accessToken = sessionStorage.getItem('accessToken');

  const apiHeaders = useHeaders(accessToken);

  useEffect(() => {
    const fetchUserPlaylists = async () => {
      const response = await fetch('https://api.spotify.com/v1/me/playlists', apiHeaders);
      const data: CurrentUserPlaylist = await response.json();
      setUserPlaylists(data);
    };

    if (accessToken) {
      fetchUserPlaylists();
    }
  }, [accessToken, apiHeaders]);
  return <div>{userPlaylists?.items.map(item => <p>{item.name}</p>)}</div>;
};

import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { headers } from '../apis/headers';
import { CurrentUserPlaylist } from '../types/playlists/currentUserPlaylist';

type DashboardProps = {
  code: string;
};

export const Dashboard = ({ code }: DashboardProps) => {
  const authContext = useContext(AuthContext);
  const [userPlaylists, setUserPlaylists] = useState<CurrentUserPlaylist>();

  if (!authContext) {
    throw new Error('Profile must be used within an AuthProvider');
  }
  const { login, isUserLoggedIn, isUserPremiumMember } = authContext;

  const accessToken = sessionStorage.getItem('accessToken');

  const apiHeaders = headers(accessToken);

  if (!isUserLoggedIn) {
    login(code);
  }

  useEffect(() => {
    const fetchUserPlaylists = async () => {
      const response = await fetch('https://api.spotify.com/v1/me/playlists', apiHeaders);
      const data: CurrentUserPlaylist = await response.json();
      setUserPlaylists(data);
    };

    if (accessToken) {
      fetchUserPlaylists();
    }
  }, [accessToken]);

  return (
    <div>
      {accessToken}
      {isUserLoggedIn && isUserPremiumMember ? (
        <p>You may use</p>
      ) : (
        <p>Only Premium Members can use</p>
      )}
      {userPlaylists?.items.map(items => <p key={items.id}>{items.name}</p>)}
    </div>
  );
};

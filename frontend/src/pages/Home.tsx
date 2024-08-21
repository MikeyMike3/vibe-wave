import { useEffect } from 'react';
import { ErrorMessage } from '../components/ErrorMessage';
import { MainLoading } from '../components/MainLoading';
import { UserPlaylist } from '../components/UserPlaylist';
import { useFetchUserPlaylists } from '../hooks/apis/fetch/useFetchUserPlaylists';
import { useSpotifyPlayerContext } from '../hooks/context/useSpotifyPlayerContext';

export const Home = () => {
  const { userPlaylists, isUserPlaylistsLoading, isUserPlaylistsError } = useFetchUserPlaylists();

  const { player, deviceId } = useSpotifyPlayerContext();
  useEffect(() => {
    const playTrack = async () => {
      if (!player || !deviceId) return;

      await player._options.getOAuthToken(async accessToken => {
        const response = await fetch(
          `https://api.spotify.com/v1/me/player/play?device_id=${deviceId}`,
          {
            method: 'PUT',
            body: JSON.stringify({ uris: ['spotify:track:6VObnIkLVruX4UVyxWhlqm'] }),
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${accessToken}`,
            },
          },
        );

        if (response.ok) {
          console.log('Playback started');
        } else {
          console.error('Failed to start playback', await response.json());
        }
      });
    };

    playTrack();
  }, [deviceId, player]);

  if (isUserPlaylistsLoading) {
    return <MainLoading />;
  }

  if (isUserPlaylistsError) {
    return <ErrorMessage />;
  }

  return (
    <div>
      {userPlaylists?.items.map(item => (
        <UserPlaylist
          key={item.id}
          name={item.name}
          images={item.images}
          type={item.type}
          owner={item.owner.display_name}
        />
      ))}
    </div>
  );
};

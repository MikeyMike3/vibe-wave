import { ErrorMessage } from '../components/ErrorMessage';
import { MainLoading } from '../components/MainLoading';
import { UserPlaylist } from '../components/UserPlaylist';
import { useFetchUserPlaylists } from '../hooks/apis/fetch/useFetchUserPlaylists';

export const PartyMode = () => {
  const { userPlaylists, isUserPlaylistsError, isUserPlaylistsLoading } = useFetchUserPlaylists();

  if (isUserPlaylistsLoading) {
    return <MainLoading />;
  }

  if (isUserPlaylistsError) {
    return <ErrorMessage />;
  }
  return (
    <div>{userPlaylists?.items.map(item => <UserPlaylist key={item.id} name={item.name} />)}</div>
  );
};

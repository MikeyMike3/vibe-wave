import { ErrorMessage } from '../components/ErrorMessage';
import { MainLoading } from '../components/MainLoading';
import { UserPlaylist } from '../components/UserPlaylist';
import { useFetchUserPlaylists } from '../hooks/apis/fetch/useFetchUserPlaylists';

export const Home = () => {
  const { userPlaylists, isUserPlaylistsLoading, isUserPlaylistsError } = useFetchUserPlaylists();

  if (isUserPlaylistsLoading) {
    return <MainLoading />;
  }

  if (isUserPlaylistsError) {
    return <ErrorMessage />;
  }

  return (
    <div>
      {userPlaylists?.items.map(item => (
        <UserPlaylist key={item.id} name={item.name} images={item.images} />
      ))}
    </div>
  );
};

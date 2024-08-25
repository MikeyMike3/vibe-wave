import { ErrorMessage } from '../components/ErrorMessage';
import { MainLoading } from '../components/MainLoading';
import { UserPlaylist } from '../components/UserPlaylist';
import { useFetchUserPlaylists } from '../hooks/apis/useFetchUserPlaylists';

export const Home = () => {
  const { userPlaylists, isUserPlaylistsLoading, isUserPlaylistsError } = useFetchUserPlaylists();

  if (isUserPlaylistsLoading) {
    return <MainLoading />;
  }

  if (isUserPlaylistsError) {
    return <ErrorMessage />;
  }

  return (
    <div className="flex-1 overflow-y-scroll">
      {userPlaylists?.items.map(item => (
        <UserPlaylist
          key={item.id}
          name={item.name}
          images={item.images}
          type={item.type}
          owner={item.owner.display_name}
          playlistId={item.id}
        />
      ))}
    </div>
  );
};

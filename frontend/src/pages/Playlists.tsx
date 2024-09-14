import { ErrorMessage } from '../components/ErrorMessage';
import { MainLoading } from '../components/MainLoading';
import { UserPlaylist } from '../components/UserPlaylist';
import { useFetchUserPlaylists } from '../hooks/apis/useFetchUserPlaylists';

export const Playlists = () => {
  const { userPlaylists, isUserPlaylistsLoading, isUserPlaylistsError } = useFetchUserPlaylists();

  if (isUserPlaylistsLoading) {
    return <MainLoading />;
  }

  if (isUserPlaylistsError) {
    return <ErrorMessage />;
  }

  return (
    <div className="grid h-full w-full flex-1 grid-cols-[repeat(auto-fit,_minmax(250px,_1fr))] gap-7">
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

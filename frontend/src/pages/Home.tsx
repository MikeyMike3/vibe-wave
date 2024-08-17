import { useFetchUserPlaylists } from '../hooks/apis/fetch/useFetchUserPlaylists';

export const Home = () => {
  const { userPlaylists, isUserPlaylistsLoading, isUserPlaylistsError } = useFetchUserPlaylists();

  if (isUserPlaylistsLoading) {
    return <p>loading...</p>;
  }

  if (isUserPlaylistsError) {
    return <p>An error occurred. Please refresh to try again</p>;
  }

  return <div>{userPlaylists?.items.map(item => <p key={item.id}>{item.name}</p>)}</div>;
};

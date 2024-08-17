import { useFetchUserPlaylists } from '../hooks/useFetchUserPlaylists';

export const Home = () => {
  const { userPlaylists, isUserPlaylistsLoading, isUserPlaylistError } = useFetchUserPlaylists();

  if (isUserPlaylistsLoading) {
    return <p>loading...</p>;
  }

  if (isUserPlaylistError) {
    return <p>An Error occurred. Please Refresh to try again</p>;
  }

  return <div>{userPlaylists?.items.map(item => <p key={item.id}>{item.name}</p>)}</div>;
};

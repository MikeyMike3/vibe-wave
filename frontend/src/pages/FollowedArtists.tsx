import { ErrorMessage } from '../components/ErrorMessage';
import { MainLoading } from '../components/MainLoading';
import { SearchResultArtistItem } from '../components/SearchResultArtistItem';
import { useFetchFollowedArtists } from '../hooks/apis/useFetchFollowedArtists';

export const FollowedArtists = () => {
  const { followedArtists, isError, isLoading } = useFetchFollowedArtists();

  if (isLoading) {
    return <MainLoading />;
  }

  if (isError) {
    return <ErrorMessage />;
  }

  return (
    <div className="text-white">
      {followedArtists?.items.map(item => <SearchResultArtistItem artist={item} />)}
    </div>
  );
};

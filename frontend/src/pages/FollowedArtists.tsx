import { ErrorMessage } from '../components/ErrorMessage';
import { MainLoading } from '../components/MainLoading';
import { SearchResultArtistItem } from '../components/SearchResultArtistItem';
import { GridContainer } from '../components/styledComponents/GridContainer';
import { Wrapper } from '../components/styledComponents/Wrapper';
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
      <Wrapper>
        {followedArtists?.artists.items.length === 0 && <p>You aren't following any artists.</p>}
        <GridContainer>
          {followedArtists?.artists.items.map(item => (
            <SearchResultArtistItem key={item.id} artist={item} />
          ))}
        </GridContainer>
      </Wrapper>
    </div>
  );
};

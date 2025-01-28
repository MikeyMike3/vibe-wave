import { useState } from 'react';
import { ErrorMessage } from '../components/ErrorMessage';
import { MainLoading } from '../components/MainLoading';
import { SearchResultArtistItem } from '../components/SearchResultArtistItem';
import { GridContainer } from '../components/styledComponents/GridContainer';
import { Wrapper } from '../components/styledComponents/Wrapper';
import { useFetchFollowedArtists } from '../hooks/apis/useFetchFollowedArtists';
import { UserItemsSearchBar } from '../components/UserItemsSearchBar';

export const FollowedArtists = () => {
  const { followedArtists, isError, isLoading } = useFetchFollowedArtists();

  const [filteredFollowedArtists, setFilteredFollowedArtists] = useState<
    SpotifyApi.ArtistObjectFull[] | undefined
  >();

  const [input, setInput] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;
    setInput(input);
    const lowerCaseInput = input.toLowerCase();

    const filtered = followedArtists?.artists.items.filter(item =>
      item.name.includes(lowerCaseInput),
    );
    setFilteredFollowedArtists(filtered);
  };

  if (isLoading) {
    return <MainLoading />;
  }

  if (isError) {
    return <ErrorMessage />;
  }
  return (
    <div className="text-white">
      <Wrapper>
        <UserItemsSearchBar
          placeholder="Search Followed Artists"
          handleInputChangeFunction={handleInputChange}
        />
        {followedArtists?.artists.items.length === 0 && <p>You aren't following any artists.</p>}
        <GridContainer>
          {input.length > 0 && filteredFollowedArtists?.length === 0 ? (
            <p>No Results Found.</p>
          ) : (
            (filteredFollowedArtists && filteredFollowedArtists?.length > 0
              ? filteredFollowedArtists
              : followedArtists?.artists.items
            )?.map(item => <SearchResultArtistItem key={item.id} artist={item} />)
          )}
        </GridContainer>
      </Wrapper>
    </div>
  );
};

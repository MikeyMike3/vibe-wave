import { useState } from 'react';
import { ErrorMessage } from '../components/ErrorMessage';
import { MainLoading } from '../components/MainLoading';
import { SearchResultAlbumItem } from '../components/SearchResultAlbumItem';
import { GridContainer } from '../components/styledComponents/GridContainer';
import { Wrapper } from '../components/styledComponents/Wrapper';
import { UserItemsSearchBar } from '../components/UserItemsSearchBar';
import { useFetchSavedAlbums } from '../hooks/apis/useFetchSavedAlbums';
import { PageTitle } from '../components/styledComponents/PageTitle';

export const SavedAlbums = () => {
  const { savedAlbums, isError, isLoading } = useFetchSavedAlbums();
  const [filteredSavedAlbums, setFilteredSavedAlbums] = useState<
    SpotifyApi.SavedAlbumObject[] | undefined
  >();

  const [input, setInput] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;
    setInput(input);
    const lowerCaseInput = input.toLowerCase();

    const filtered = savedAlbums?.items.filter(
      item =>
        item.album.name.toLowerCase().includes(lowerCaseInput) ||
        item.album.artists.some(artist => artist.name.toLowerCase().includes(lowerCaseInput)),
    );
    setFilteredSavedAlbums(filtered);
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
        <PageTitle title="Your Saved Albums" />
        <UserItemsSearchBar
          placeholder="Search Saved Albums"
          handleInputChangeFunction={handleInputChange}
        />
        <GridContainer>
          {input.length > 0 && filteredSavedAlbums?.length === 0 ? (
            <p>No Results Found.</p>
          ) : (
            (filteredSavedAlbums && filteredSavedAlbums.length > 0
              ? filteredSavedAlbums
              : savedAlbums?.items
            )?.map(item => <SearchResultAlbumItem key={item.album.id} album={item.album} />)
          )}
        </GridContainer>
      </Wrapper>
    </div>
  );
};

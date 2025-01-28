import { useState } from 'react';
import { ErrorMessage } from '../components/ErrorMessage';
import { MainLoading } from '../components/MainLoading';
import { GridContainer } from '../components/styledComponents/GridContainer';
import { Wrapper } from '../components/styledComponents/Wrapper';
import { UserPlaylist } from '../components/UserPlaylist';
import { useFetchUserPlaylists } from '../hooks/apis/useFetchUserPlaylists';
import { UserItemsSearchBar } from '../components/UserItemsSearchBar';

export const Playlists = () => {
  const { data: userPlaylists, isLoading, isError } = useFetchUserPlaylists();
  const [filteredPlaylists, setFilteredPlaylists] = useState<
    SpotifyApi.PlaylistObjectSimplified[] | undefined
  >();

  const [input, setInput] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;
    setInput(input);
    const lowerCaseInput = input.toLowerCase();
    const filtered = userPlaylists?.items.filter(item =>
      item?.name?.toLowerCase().includes(lowerCaseInput),
    );
    setFilteredPlaylists(filtered);

    if (input.length === 0) {
      setInput('');
    }
  };

  if (isLoading) {
    return <MainLoading />;
  }

  if (isError) {
    return <ErrorMessage />;
  }

  return (
    <Wrapper>
      <UserItemsSearchBar
        placeholder="Search Playlists"
        handleInputChangeFunction={handleInputChange}
      />
      <GridContainer>
        {input?.length > 0 && filteredPlaylists?.length === 0 ? (
          <p>No Results Found.</p>
        ) : (
          (filteredPlaylists && filteredPlaylists?.length > 0
            ? filteredPlaylists
            : userPlaylists?.items
          )?.map(
            item =>
              item && (
                <UserPlaylist
                  key={item.id}
                  name={item.name}
                  images={item.images}
                  type={item.type}
                  owner={item.owner?.display_name}
                  playlistId={item.id}
                />
              ),
          )
        )}
      </GridContainer>
    </Wrapper>
  );
};

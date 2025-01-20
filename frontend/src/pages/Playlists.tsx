import { useEffect, useState } from 'react';
import { ErrorMessage } from '../components/ErrorMessage';
import { MainLoading } from '../components/MainLoading';
import { GridContainer } from '../components/styledComponents/GridContainer';
import { Wrapper } from '../components/styledComponents/Wrapper';
import { UserPlaylist } from '../components/UserPlaylist';
import { useFetchUserPlaylists } from '../hooks/apis/useFetchUserPlaylists';

export const Playlists = () => {
  const { data: userPlaylists, isLoading, isError } = useFetchUserPlaylists();
  const [inputState, setInputState] = useState('');
  const [filteredPlaylists, setFilteredPlaylists] = useState<
    SpotifyApi.PlaylistObjectSimplified[] | undefined
  >();

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputState(e.target.value);
  };

  useEffect(() => {
    const lowerCaseInput = inputState.toLowerCase();
    if (userPlaylists) {
      const filtered = userPlaylists.items.filter(playlist =>
        playlist.name.toLowerCase().includes(lowerCaseInput),
      );
      setFilteredPlaylists(filtered);
      if (inputState.length < 0) {
        setInputState('');
      }
    }
  }, [inputState, userPlaylists]);

  if (isLoading) {
    return <MainLoading />;
  }

  if (isError) {
    return <ErrorMessage />;
  }

  return (
    <Wrapper>
      <input placeholder="Search Playlists" onChange={onChange}></input>
      <GridContainer>
        {(filteredPlaylists && filteredPlaylists?.length > 0
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
        )}
      </GridContainer>
    </Wrapper>
  );
};

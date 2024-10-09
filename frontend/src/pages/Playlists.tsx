import { ErrorMessage } from '../components/ErrorMessage';
import { MainLoading } from '../components/MainLoading';
import { GridContainer } from '../components/styledComponents/GridContainer';
import { Wrapper } from '../components/styledComponents/Wrapper';
import { UserPlaylist } from '../components/UserPlaylist';
import { useFetchUserPlaylists } from '../hooks/apis/useFetchUserPlaylists';

export const Playlists = () => {
  const { data: userPlaylists, isLoading, isError } = useFetchUserPlaylists();

  if (isLoading) {
    return <MainLoading />;
  }

  if (isError) {
    return <ErrorMessage />;
  }

  return (
    <Wrapper>
      <GridContainer>
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
      </GridContainer>
    </Wrapper>
  );
};

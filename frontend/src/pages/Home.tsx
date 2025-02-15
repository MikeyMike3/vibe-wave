import { ErrorMessage } from '../components/ErrorMessage';
import { MainLoading } from '../components/MainLoading';
import { SearchResultAlbumItem } from '../components/SearchResultAlbumItem';
import { SearchResultArtistItem } from '../components/SearchResultArtistItem';
import { Wrapper } from '../components/styledComponents/Wrapper';
import { PlaylistItemsTable } from '../components/userPlaylistPageComp/PlaylistItemsTable';
import { UserTopTracksTR } from '../components/usersTopItemsComponents/UserTopTracksTR';
import { useFetchHomePageData } from '../hooks/apis/useFetchHomePageData';
import { UseAuthContext } from '../hooks/context/useAuthContext';

export const Home = () => {
  const { homePageData, isLoading, isError } = useFetchHomePageData();
  const { userDisplayName } = UseAuthContext();

  const getUserFirstName = (userName: string) => {
    const nameArray = userName.split(' ');
    return nameArray[0];
  };

  if (isLoading) {
    return <MainLoading />;
  }

  if (isError) {
    return <ErrorMessage />;
  }
  return (
    <Wrapper>
      <h1 className="text-white">
        Vibes start here {getUserFirstName(userDisplayName)}! Just hit play.
      </h1>
      <h2 className="text-white">Some of your top tracks are below!</h2>
      <PlaylistItemsTable shouldIncludeAlbum={true}>
        {homePageData?.topTracks.items
          .slice(0, 10)
          .map((item, index) => (
            <UserTopTracksTR
              key={item.id || index}
              position={index + 1}
              images={item.album.images}
              trackName={item.name}
              artists={item.artists}
              album={item.album}
              trackLength={item.duration_ms}
              track={item}
              trackId={item.id}
            />
          ))}
      </PlaylistItemsTable>
      <h2>Some of your top artists!</h2>
      <div className="flex gap-7 overflow-x-scroll pb-4" style={{ width: 'calc(100vw - 360px)' }}>
        {homePageData?.topArtists?.items.map(item => (
          <SearchResultArtistItem key={item.id} artist={item} />
        ))}
      </div>
      <h2> Upcoming Albums!</h2>
      <div className="flex gap-7 overflow-x-scroll pb-4" style={{ width: 'calc(100vw - 360px)' }}>
        {homePageData?.newAlbumReleases?.albums?.items.map(item => (
          <SearchResultAlbumItem key={item.id} album={item} />
        ))}
      </div>
    </Wrapper>
  );
};

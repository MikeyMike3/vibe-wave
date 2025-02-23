import { SwiperSlide } from 'swiper/react';
import { ErrorMessage } from '../components/ErrorMessage';
import { MainLoading } from '../components/MainLoading';
import { SearchResultAlbumItem } from '../components/SearchResultAlbumItem';
import { SearchResultArtistItem } from '../components/SearchResultArtistItem';
import { Wrapper } from '../components/styledComponents/Wrapper';
import { GeneralSwiper } from '../components/swiper/GeneralSwiper';
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
      <h1 className="pb-6 text-5xl font-semibold text-aqua">
        Vibe starts here <span className="text-magenta">{getUserFirstName(userDisplayName)}</span>,
        Just hit play.
      </h1>
      <h2 className="pb-4 text-3xl text-textPrimary">Your Top Tracks:</h2>
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
      <h2 className="pb-4 pt-4 text-3xl text-textPrimary">Your Top Artists:</h2>
      <GeneralSwiper>
        {homePageData?.topArtists?.items.map(item => (
          <SwiperSlide className="w-[250px]">
            <SearchResultArtistItem key={item.id} artist={item} />
          </SwiperSlide>
        ))}
      </GeneralSwiper>
      <h2 className="pb-4 pt-4 text-3xl text-textPrimary"> Recently Released Albums:</h2>
      <GeneralSwiper>
        {homePageData?.newAlbumReleases?.albums?.items.map(item => (
          <SwiperSlide className="w-[250px]">
            <SearchResultAlbumItem key={item.id} album={item} />
          </SwiperSlide>
        ))}
      </GeneralSwiper>
    </Wrapper>
  );
};

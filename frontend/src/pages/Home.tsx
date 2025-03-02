import { SwiperRef, SwiperSlide } from 'swiper/react';
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
import { PageSubHeading } from '../components/styledComponents/PageSubHeading';
import { useRef } from 'react';
import { SwiperSlideButtons } from '../components/swiper/SwiperSlideButtons';
import { SwiperButtonsAndTitleFlex } from '../components/swiper/SwiperButtonsAndTitleFlex';

export const Home = () => {
  const { homePageData, isLoading, isError } = useFetchHomePageData();
  const { userDisplayName } = UseAuthContext();

  const artistSwiper = useRef<SwiperRef>(null);
  const albumSwiper = useRef<SwiperRef>(null);

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
      <h1 className="pb-1 text-5xl font-semibold text-aqua">
        Vibe starts here <span className="text-magenta">{getUserFirstName(userDisplayName)}</span>,
        Just hit play.
      </h1>
      <PageSubHeading text="Your Top Tracks" />
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
      <SwiperButtonsAndTitleFlex>
        <PageSubHeading text="Your Top Artists" />

        <SwiperSlideButtons swiperRef={artistSwiper} />
      </SwiperButtonsAndTitleFlex>
      <GeneralSwiper swiperRef={artistSwiper}>
        {homePageData?.topArtists?.items.map(item => (
          <SwiperSlide className="w-[250px]">
            <SearchResultArtistItem key={item.id} artist={item} setHeight64={true} />
          </SwiperSlide>
        ))}
      </GeneralSwiper>
      <SwiperButtonsAndTitleFlex>
        <PageSubHeading text="Recently Released Albums" />
        <SwiperSlideButtons swiperRef={albumSwiper} />
      </SwiperButtonsAndTitleFlex>
      <GeneralSwiper swiperRef={albumSwiper}>
        {homePageData?.newAlbumReleases?.albums?.items.map(item => (
          <SwiperSlide className="w-[250px]">
            <SearchResultAlbumItem key={item.id} album={item} />
          </SwiperSlide>
        ))}
      </GeneralSwiper>
    </Wrapper>
  );
};

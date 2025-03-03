import { useEffect, useState } from 'react';
import { useSearchContext } from '../hooks/context/useSearchContext';
import { SearchResultArtistItem } from '../components/SearchResultArtistItem';
import { SearchResultAlbumItem } from '../components/SearchResultAlbumItem';
import { AllSearchResults } from '../components/AllSearchResults';
import { GridContainer } from '../components/styledComponents/GridContainer';
import { Wrapper } from '../components/styledComponents/Wrapper';
import { PlaylistItemsTable } from '../components/userPlaylistPageComp/PlaylistItemsTable';
import { ArtistTracksTR } from '../components/artistPageComponents/ArtistTracksTR';
import { PageSubHeading } from '../components/styledComponents/PageSubHeading';
import { GeneralSwiper } from '../components/swiper/GeneralSwiper';
import { SwiperSlide } from 'swiper/react';

export const Search = () => {
  const { searchResults } = useSearchContext();
  const [isAllClicked, setIsAllClicked] = useState(true);
  const [isTracksClicked, setIsTracksClicked] = useState(false);
  const [isArtistsClicked, setIsArtistsClicked] = useState(false);
  const [isAlbumsClicked, setIsAlbumsClicked] = useState(false);

  const [height, setHeight] = useState(
    typeof window !== 'undefined' && window.innerWidth < 1024
      ? 'calc(100vh - 290px)'
      : 'calc(100vh - 195px)',
  );

  useEffect(() => {
    const updateHeight = () => {
      setHeight(window.innerWidth < 1024 ? 'calc(100vh - 275px)' : 'calc(100vh - 185px)');
    };

    // Listen for window resize events
    window.addEventListener('resize', updateHeight);

    // Cleanup event listener on unmount
    return () => window.removeEventListener('resize', updateHeight);
  }, []);

  return (
    <Wrapper>
      {!searchResults.albums && !searchResults.artists && !searchResults.tracks && (
        <div className="relative" style={{ height }}>
          <div className="absolute inset-0 flex h-full items-center justify-center bg-black bg-opacity-50">
            <p className="text-xl text-aqua">
              Search a song, artist, or an album and set the vibe!
            </p>
          </div>
        </div>
      )}

      {searchResults.albums && searchResults.artists && searchResults.tracks && (
        <>
          <div className="flex gap-4 pb-4 text-white">
            <GeneralSwiper>
              <SwiperSlide className="mr-3 w-[50px]">
                <button
                  className={`${isAllClicked ? 'bg-white text-black' : 'hover:bg-bgAccentHover'} rounded-xl bg-bgAccent p-2 px-4 duration-150 ${isAllClicked && 'hover:bg-white'}`}
                  onClick={() => {
                    setIsAllClicked(true);
                    setIsTracksClicked(false);
                    setIsArtistsClicked(false);
                    setIsAlbumsClicked(false);
                  }}
                >
                  All
                </button>
              </SwiperSlide>
              <SwiperSlide className="mr-3 w-[75px]">
                <button
                  className={`${isTracksClicked ? 'bg-white text-black' : 'hover:bg-bgAccentHover'} rounded-xl bg-bgAccent p-2 px-4 duration-150 ${isTracksClicked && 'hover:bg-white'}`}
                  onClick={() => {
                    setIsAllClicked(false);
                    setIsTracksClicked(true);
                    setIsArtistsClicked(false);
                    setIsAlbumsClicked(false);
                  }}
                >
                  Tracks
                </button>
              </SwiperSlide>
              <SwiperSlide className="mr-3 w-[75px]">
                <button
                  className={`${isArtistsClicked ? 'bg-white text-black' : 'hover:bg-bgAccentHover'} rounded-xl bg-bgAccent p-2 px-4 duration-150 ${isArtistsClicked && 'hover:bg-white'}`}
                  onClick={() => {
                    setIsAllClicked(false);
                    setIsTracksClicked(false);
                    setIsArtistsClicked(true);
                    setIsAlbumsClicked(false);
                  }}
                >
                  Artists
                </button>
              </SwiperSlide>
              <SwiperSlide className="mr-3 w-[75px]">
                <button
                  className={`${isAlbumsClicked ? 'bg-white text-black' : 'hover:bg-bgAccentHover'} rounded-xl bg-bgAccent p-2 px-4 duration-150 ${isAlbumsClicked && 'hover:bg-white'}`}
                  onClick={() => {
                    setIsAllClicked(false);
                    setIsTracksClicked(false);
                    setIsArtistsClicked(false);
                    setIsAlbumsClicked(true);
                  }}
                >
                  Albums
                </button>
              </SwiperSlide>
            </GeneralSwiper>
          </div>

          {isAllClicked && (
            <AllSearchResults
              albums={searchResults.albums}
              artists={searchResults.artists}
              tracks={searchResults.tracks}
            />
          )}

          {isTracksClicked && (
            <>
              <PageSubHeading text="Tracks" />
              <PlaylistItemsTable shouldIncludeAlbum={true}>
                {(searchResults?.tracks?.items?.length ?? 0) > 0 ? (
                  searchResults?.tracks?.items.map((item, index) => (
                    <ArtistTracksTR
                      key={item.id || index} // Ensure a unique key
                      position={index + 1}
                      images={item.album.images}
                      trackName={item.name}
                      artists={item.artists}
                      trackLength={item.duration_ms}
                      track={item}
                      trackId={item.id}
                      album={item.album}
                    />
                  ))
                ) : (
                  <p className="text-textAccent">No tracks found.</p>
                )}
              </PlaylistItemsTable>
            </>
          )}

          {isArtistsClicked && (
            <>
              <PageSubHeading text="Artists" />

              {(searchResults?.artists?.items?.length ?? 0) > 0 ? (
                <GridContainer>
                  {searchResults?.artists?.items.map(item => (
                    <SearchResultArtistItem key={item.id} artist={item} />
                  ))}
                </GridContainer>
              ) : (
                <p className="text-textAccent">No artists found.</p>
              )}
            </>
          )}

          {isAlbumsClicked && (
            <>
              <PageSubHeading text="Albums" />
              {(searchResults?.albums?.items?.length ?? 0) > 0 ? (
                <GridContainer>
                  {searchResults?.albums?.items.map(item => (
                    <SearchResultAlbumItem key={item.id} album={item} />
                  ))}
                </GridContainer>
              ) : (
                <p className="text-textAccent">No albums found.</p>
              )}
            </>
          )}
        </>
      )}
    </Wrapper>
  );
};

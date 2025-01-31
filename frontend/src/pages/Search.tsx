import { useState } from 'react';
import { useSearchContext } from '../hooks/context/useSearchContext';
import { SearchResultArtistItem } from '../components/SearchResultArtistItem';
import { SearchResultAlbumItem } from '../components/SearchResultAlbumItem';
import { AllSearchResults } from '../components/AllSearchResults';
import { GridContainer } from '../components/styledComponents/GridContainer';
import { Wrapper } from '../components/styledComponents/Wrapper';
import { PlaylistItemsTable } from '../components/userPlaylistPageComp/PlaylistItemsTable';
import { ArtistTracksTR } from '../components/artistPageComponents/ArtistTracksTR';

export const Search = () => {
  const { searchResults } = useSearchContext();
  const [isAllClicked, setIsAllClicked] = useState(true);
  const [isTracksClicked, setIsTracksClicked] = useState(false);
  const [isArtistsClicked, setIsArtistsClicked] = useState(false);
  const [isAlbumsClicked, setIsAlbumsClicked] = useState(false);

  return (
    <Wrapper>
      {searchResults.albums && searchResults.artists && searchResults.tracks && (
        <>
          <div className="flex gap-4 pb-4 text-white">
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
              <h2 className="pb-4 text-3xl text-textPrimary">Tracks</h2>
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
              <h2 className="pb-4 text-3xl text-textPrimary">Artists</h2>

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
              <h2 className="pb-4 text-3xl text-textPrimary">Albums</h2>
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

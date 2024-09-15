import { useState } from 'react';
import { SearchResultTrackItem } from '../components/SearchResultTrackItem';
import { useSearchContext } from '../hooks/context/useSearchContext';
import { SearchResultArtistItem } from '../components/SearchResultArtistItem';
import { SearchResultAlbumItem } from '../components/SearchResultAlbumItem';
import { AllSearchResults } from '../components/AllSearchResults';

export const Search = () => {
  const { searchResults } = useSearchContext();
  const [isAllClicked, setIsAllClicked] = useState(true);
  const [isTracksClicked, setIsTracksClicked] = useState(false);
  const [isArtistsClicked, setIsArtistsClicked] = useState(false);
  const [isAlbumsClicked, setIsAlbumsClicked] = useState(false);

  return (
    <>
      <div className="flex gap-4 py-4 text-white">
        <button
          className={`${isAllClicked && 'bg-white text-black'} rounded-xl bg-bgAccent p-2 px-4`}
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
          className={`${isTracksClicked && 'bg-white text-black'} rounded-xl bg-bgAccent p-2 px-4`}
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
          className={`${isArtistsClicked && 'bg-white text-black'} rounded-xl bg-bgAccent p-2 px-4`}
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
          className={`${isAlbumsClicked && 'bg-white text-black'} rounded-xl bg-bgAccent p-2 px-4`}
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
          {searchResults?.tracks?.items.map(item => (
            <SearchResultTrackItem key={item.id} track={item} />
          ))}
        </>
      )}
      {isArtistsClicked && (
        <>
          <h2 className="pb-4 text-3xl text-textPrimary">Artists</h2>
          <div className="grid grid-cols-[repeat(auto-fit,_minmax(250px,_1fr))] gap-7">
            {searchResults?.artists?.items.map(item => (
              <SearchResultArtistItem key={item.id} artist={item} />
            ))}
          </div>
        </>
      )}
      {isAlbumsClicked && (
        <>
          <h2 className="pb-4 text-3xl text-textPrimary">Albums</h2>
          <div className="grid grid-cols-[repeat(auto-fit,_minmax(250px,_1fr))] gap-7">
            {searchResults?.albums?.items.map(item => (
              <SearchResultAlbumItem key={item.id} album={item} />
            ))}
          </div>
        </>
      )}
    </>
  );
};

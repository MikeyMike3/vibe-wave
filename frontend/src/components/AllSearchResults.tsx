import { SearchResultAlbumItem } from './SearchResultAlbumItem';
import { SearchResultArtistItem } from './SearchResultArtistItem';
import { SearchResultTrackItem } from './SearchResultTrackItem';

type AllSearchResultsProps = {
  //prettier-ignore
  tracks: SpotifyApi.PagingObject<SpotifyApi.TrackObjectFull> | undefined;
  //prettier-ignore
  artists: SpotifyApi.PagingObject<SpotifyApi.ArtistObjectFull> | undefined
  //prettier-ignore
  albums: SpotifyApi.PagingObject<SpotifyApi.AlbumObjectSimplified> | undefined
};

export const AllSearchResults = ({ tracks, artists, albums }: AllSearchResultsProps) => {
  return (
    <>
      <section>
        <h2 className="pb-4 text-3xl text-textPrimary">Tracks</h2>
        {tracks?.items
          .slice(0, 5)
          .map(item => <SearchResultTrackItem key={item.id} track={item} />)}
      </section>
      <section>
        <h2 className="py-4 text-3xl text-textPrimary">Artists</h2>
        <div className="flex gap-7 overflow-x-scroll pb-4" style={{ width: 'calc(100vw - 330px)' }}>
          {artists?.items.map(item => <SearchResultArtistItem key={item.id} artist={item} />)}
        </div>
      </section>
      <section>
        <h2 className="py-4 text-3xl text-textPrimary">Albums</h2>
        <div className="flex gap-7 overflow-x-scroll pb-4" style={{ width: 'calc(100vw - 330px)' }}>
          {albums?.items.map(item => <SearchResultAlbumItem key={item.id} album={item} />)}
        </div>
      </section>
    </>
  );
};

import { ArtistTracksTR } from './artistPageComponents/ArtistTracksTR';
import { SearchResultAlbumItem } from './SearchResultAlbumItem';
import { SearchResultArtistItem } from './SearchResultArtistItem';
import { PlaylistItemsTable } from './userPlaylistPageComp/PlaylistItemsTable';

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
        <PlaylistItemsTable shouldIncludeAlbum={true}>
          {(tracks?.items?.length ?? 0) > 0 ? (
            tracks?.items.slice(0, 5).map((item, index) => (
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
      </section>
      <section>
        <h2 className="py-4 text-3xl text-textPrimary">Artists</h2>
        {(artists?.items?.length ?? 0) > 0 ? (
          <div
            className="flex gap-7 overflow-x-scroll pb-4"
            style={{ width: 'calc(100vw - 360px)' }}
          >
            {artists?.items.map(item => <SearchResultArtistItem key={item.id} artist={item} />)}
          </div>
        ) : (
          <p className="text-textAccent">No artists found.</p>
        )}
      </section>
      <section>
        <h2 className="py-4 text-3xl text-textPrimary">Albums</h2>
        {(albums?.items?.length ?? 0) > 0 ? (
          <div
            className="flex gap-7 overflow-x-scroll pb-4"
            style={{ width: 'calc(100vw - 360px)' }}
          >
            {albums?.items.map(item => <SearchResultAlbumItem key={item.id} album={item} />)}
          </div>
        ) : (
          <p className="text-textAccent">No albums found.</p>
        )}
      </section>
    </>
  );
};

import { useState } from 'react';
import { ErrorMessage } from '../components/ErrorMessage';
import { MainLoading } from '../components/MainLoading';
import { PlayLikedTracksButton } from '../components/PlayLikedTracksButton';
import { ShuffleTracksButton } from '../components/spotifyPlayer/ShuffleTracksButton';
import { Wrapper } from '../components/styledComponents/Wrapper';
import { PlaylistItemsButtonsFlexContainer } from '../components/userPlaylistPageComp/PlaylistItemsButtonsFlexContainer';
import { PlaylistItemsGrid } from '../components/userPlaylistPageComp/PlaylistItemsGrid';
import { PlaylistItemsHeader } from '../components/userPlaylistPageComp/PlaylistItemsHeader';
import { PlaylistItemsHeaderFlexContainer } from '../components/userPlaylistPageComp/PlaylistItemsHeaderFlexContainer';
import { PlaylistItemsTable } from '../components/userPlaylistPageComp/PlaylistItemsTable';
import { PlaylistItemsTR } from '../components/userPlaylistPageComp/PlaylistItemsTR';
import { PlaylistTableColumnFlexContainer } from '../components/userPlaylistPageComp/PlaylistTableColumnFlexContainer';
import { formatTimeInHours } from '../functions/formatTimeInHours';
import { useFetchSavedTracks } from '../hooks/apis/useFetchSavedTracks';
import { UserItemsSearchBar } from '../components/UserItemsSearchBar';

export const LikedSongs = () => {
  const { savedTracks, isLoading, isError } = useFetchSavedTracks();
  const [input, setInput] = useState('');
  const [filteredPlaylistItems, setFilteredPlaylistItems] = useState<
    SpotifyApi.PlaylistTrackObject[] | undefined
  >();

  if (isLoading) {
    return <MainLoading />;
  }

  if (isError) {
    return <ErrorMessage />;
  }

  return (
    <Wrapper>
      <PlaylistItemsGrid>
        <div>
          <PlaylistTableColumnFlexContainer>
            <PlaylistItemsHeaderFlexContainer>
              <PlaylistItemsHeader
                playlistName={'Liked Songs'}
                playlistOwnerName={'Spotify'}
                playlistLength={savedTracks?.items.length}
                playlistTotalTime={formatTimeInHours(savedTracks?.items)}
              />
              <UserItemsSearchBar
                setFilteredArray={setFilteredPlaylistItems}
                placeHolder="Search Liked Songs"
                inputState={input}
                state={savedTracks as SpotifyApi.PlaylistTrackResponse}
                setInputState={setInput}
              />
            </PlaylistItemsHeaderFlexContainer>

            <PlaylistItemsButtonsFlexContainer>
              <PlayLikedTracksButton likedTracks={savedTracks?.items} />
              <ShuffleTracksButton />
            </PlaylistItemsButtonsFlexContainer>

            <PlaylistItemsTable shouldIncludeAlbum={true}>
              {input.length > 0 && filteredPlaylistItems?.length === 0 ? (
                <p>No Results Found.</p>
              ) : (
                (filteredPlaylistItems && filteredPlaylistItems?.length > 0
                  ? filteredPlaylistItems
                  : savedTracks?.items
                )?.map((item, index) => (
                  <PlaylistItemsTR
                    key={item.track?.id || index} // Ensure a unique key
                    position={index + 1}
                    images={item.track?.album.images}
                    trackName={item.track?.name}
                    artists={item.track?.artists}
                    albumId={item.track?.album.id}
                    albumName={item.track?.album.name}
                    trackLength={item.track?.duration_ms}
                    track={item}
                    trackId={item.track?.id}
                    playlistArray={savedTracks?.items as SpotifyApi.PlaylistTrackObject[]}
                    filteredPlaylist={filteredPlaylistItems}
                  />
                ))
              )}
            </PlaylistItemsTable>
          </PlaylistTableColumnFlexContainer>
        </div>
        <div className="sticky top-5 overflow-y-auto" style={{ height: 'calc(100vh - 210px)' }}>
          {/* <div>
            <PlaylistImage images={playlistDetails?.images} alt={playlistDetails?.name} />

            <div className="flex flex-wrap gap-3">
              <PlaylistItemsGenres artistInfo={artistInfo} />
            </div>

            <div className="flex flex-col gap-4 pt-4">
              {playlistItems?.items.slice(0, 3).map(item => {
                const artistId = item.track?.artists[0]?.id;
                if (!artistId) {
                  return;
                }
                const artist = artistInfo ? artistInfo.artistData[artistId] : null;

                return (
                  <PlaylistItemsArtist
                    id={item.track?.artists[0].id}
                    name={item.track?.artists[0]?.name}
                    images={artist?.images}
                  />
                );
              })}
            </div>
          </div> */}
        </div>
      </PlaylistItemsGrid>
    </Wrapper>
  );
};

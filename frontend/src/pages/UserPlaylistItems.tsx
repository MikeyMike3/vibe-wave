import { useParams } from 'react-router-dom';
import { useGetPlaylistItems } from '../hooks/apis/useGetPlaylistItems';
import { MainLoading } from '../components/MainLoading';
import { ErrorMessage } from '../components/ErrorMessage';
import { useFetchPlaylistDetails } from '../hooks/apis/useFetchPlaylistDetails';
import { ShuffleTracksButton } from '../components/spotifyPlayer/ShuffleTracksButton';
import { useFetchArtistImagesAndGenres } from '../hooks/apis/useFetchArtistInfoForTracks';
import { Wrapper } from '../components/styledComponents/Wrapper';
import { useState } from 'react';
import { PlaylistPagePlayButton } from '../components/PlaylistPagePlayButton';
import { PlaylistItemsTable } from '../components/userPlaylistPageComp/PlaylistItemsTable';
import { PlaylistItemsHeader } from '../components/userPlaylistPageComp/PlaylistItemsHeader';
import { PlaylistItemsGenres } from '../components/userPlaylistPageComp/PlaylistItemsGenres';
import { PlaylistImage } from '../components/PlaylistImage';
import { PlaylistItemsArtist } from '../components/userPlaylistPageComp/PlaylistItemsArtist';
import { PlaylistItemsTR } from '../components/userPlaylistPageComp/PlaylistItemsTR';
import { PlaylistItemsGrid } from '../components/userPlaylistPageComp/PlaylistItemsGrid';
import { PlaylistTableColumnFlexContainer } from '../components/userPlaylistPageComp/PlaylistTableColumnFlexContainer';
import { PlaylistItemsHeaderFlexContainer } from '../components/userPlaylistPageComp/PlaylistItemsHeaderFlexContainer';
import { PlaylistItemsButtonsFlexContainer } from '../components/userPlaylistPageComp/PlaylistItemsButtonsFlexContainer';
import { formatTimeInHours } from '../functions/formatTimeInHours';
import { UserItemsSearchBar } from '../components/UserItemsSearchBar';

export const UserPlaylistItems = () => {
  const { playlistId } = useParams();

  // I need to make another hook that combines these together so that I can Promise.All these together
  const { playlistItems, isLoading, isError } = useGetPlaylistItems(playlistId);
  const { playlistDetails } = useFetchPlaylistDetails(playlistId);
  const { data: artistInfo } = useFetchArtistImagesAndGenres(playlistItems?.items);

  const [filteredPlaylists, setFilteredPlaylists] = useState<
    SpotifyApi.PlaylistTrackObject[] | undefined
  >();
  const [input, setInput] = useState('');

  if (isLoading) {
    return <MainLoading />;
  }

  if (isError) {
    return <ErrorMessage />;
  }

  return (
    <Wrapper>
      <UserItemsSearchBar
        inputState={input}
        setInputState={setInput}
        placeHolder="Search Playlist Songs"
        state={playlistItems}
        setFilteredArray={setFilteredPlaylists}
      />
      <PlaylistItemsGrid>
        <div>
          <PlaylistTableColumnFlexContainer>
            <PlaylistItemsHeaderFlexContainer>
              <PlaylistItemsHeader
                playlistName={playlistDetails?.name}
                playlistOwnerName={playlistDetails?.owner.display_name}
                playlistLength={playlistItems?.items.length}
                playlistTotalTime={formatTimeInHours(playlistItems?.items)}
              />
            </PlaylistItemsHeaderFlexContainer>

            <PlaylistItemsButtonsFlexContainer>
              <PlaylistPagePlayButton
                playlistItems={playlistItems}
                playlistDetails={playlistDetails}
                playlistId={playlistId}
              />
              <ShuffleTracksButton />
            </PlaylistItemsButtonsFlexContainer>

            <PlaylistItemsTable shouldIncludeAlbum={true}>
              {input.length > 0 && filteredPlaylists?.length === 0 ? (
                <p>No Results Found.</p>
              ) : (
                (filteredPlaylists && filteredPlaylists?.length > 0
                  ? filteredPlaylists
                  : playlistItems?.items
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
                    playlistArray={playlistItems?.items}
                    playlistName={playlistDetails?.name}
                    playlistId={playlistId}
                    filteredPlaylist={filteredPlaylists}
                  />
                ))
              )}
            </PlaylistItemsTable>
          </PlaylistTableColumnFlexContainer>
        </div>
        <div className="sticky top-5 overflow-y-auto" style={{ height: 'calc(100vh - 210px)' }}>
          <div>
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
          </div>
        </div>
      </PlaylistItemsGrid>
    </Wrapper>
  );
};

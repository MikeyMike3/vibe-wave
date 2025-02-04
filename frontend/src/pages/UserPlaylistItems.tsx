import { useParams } from 'react-router-dom';
import { useGetPlaylistItems } from '../hooks/apis/useGetPlaylistItems';
import { MainLoading } from '../components/MainLoading';
import { ErrorMessage } from '../components/ErrorMessage';
import { useFetchPlaylistDetails } from '../hooks/apis/useFetchPlaylistDetails';
import { ShuffleTracksButton } from '../components/spotifyPlayer/ShuffleTracksButton';
import { Wrapper } from '../components/styledComponents/Wrapper';
import { useState } from 'react';
import { PlaylistPagePlayButton } from '../components/PlaylistPagePlayButton';
import { PlaylistItemsTable } from '../components/userPlaylistPageComp/PlaylistItemsTable';
import { PlaylistItemsHeader } from '../components/userPlaylistPageComp/PlaylistItemsHeader';
import { PlaylistImage } from '../components/PlaylistImage';
import { PlaylistItemsArtist } from '../components/userPlaylistPageComp/PlaylistItemsArtist';
import { PlaylistItemsTR } from '../components/userPlaylistPageComp/PlaylistItemsTR';
import { PlaylistItemsGrid } from '../components/userPlaylistPageComp/PlaylistItemsGrid';
import { PlaylistTableColumnFlexContainer } from '../components/userPlaylistPageComp/PlaylistTableColumnFlexContainer';
import { PlaylistItemsHeaderFlexContainer } from '../components/userPlaylistPageComp/PlaylistItemsHeaderFlexContainer';
import { PlaylistItemsButtonsFlexContainer } from '../components/userPlaylistPageComp/PlaylistItemsButtonsFlexContainer';
import { formatTimeInHours } from '../functions/formatTimeInHours';
import { UserItemsSearchBar } from '../components/UserItemsSearchBar';
import { OpenInSpotifyButton } from '../components/OpenInSpotifyButton';
import { useFetchUniqueArtists } from '../hooks/apis/useFetchUniqueArtists';

export const UserPlaylistItems = () => {
  const { playlistId } = useParams();

  // I need to make another hook that combines these together so that I can Promise.All these together
  const { playlistItems, isLoading, isError } = useGetPlaylistItems(playlistId);
  const { playlistDetails } = useFetchPlaylistDetails(playlistId);
  const uniqueArtists = useFetchUniqueArtists(playlistItems?.items);

  const [filteredPlaylistItems, setFilteredPlaylistItems] = useState<
    SpotifyApi.PlaylistTrackObject[] | undefined
  >();
  const [input, setInput] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;
    setInput(input);
    const lowerCaseInput = input.toLowerCase();
    const filtered = playlistItems?.items.filter(
      item =>
        item?.track?.name?.toLowerCase().includes(lowerCaseInput) ||
        item.track?.artists?.some(artist => artist.name.toLowerCase().includes(lowerCaseInput)),
    );
    setFilteredPlaylistItems(filtered);
    if (input.length === 0) {
      setInput('');
    }
  };

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
                playlistName={playlistDetails?.name}
                playlistOwnerName={playlistDetails?.owner.display_name}
                playlistLength={playlistItems?.items.length}
                playlistTotalTime={formatTimeInHours(playlistItems?.items)}
              />
              <UserItemsSearchBar
                placeholder="Search Playlist Songs"
                handleInputChangeFunction={handleInputChange}
              />
              <OpenInSpotifyButton spotifyUrl={playlistDetails?.external_urls.spotify} />
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
              {input.length > 0 && filteredPlaylistItems?.length === 0 ? (
                <p>No Results Found.</p>
              ) : (
                (filteredPlaylistItems && filteredPlaylistItems?.length > 0
                  ? filteredPlaylistItems
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
                    filteredPlaylist={filteredPlaylistItems}
                  />
                ))
              )}
            </PlaylistItemsTable>
          </PlaylistTableColumnFlexContainer>
        </div>
        <div className="sticky top-5 overflow-y-auto" style={{ height: 'calc(100vh - 250px)' }}>
          <PlaylistImage images={playlistDetails?.images} alt={playlistDetails?.name} />

          <div className="flex flex-col gap-4">
            <h2 className="text-xl text-textPrimary">Featuring: </h2>
            {uniqueArtists.uniqueArtists.map(item => (
              <PlaylistItemsArtist
                key={item.id}
                id={item.id}
                images={item.images}
                name={item.name}
              />
            ))}
          </div>
        </div>
      </PlaylistItemsGrid>
    </Wrapper>
  );
};

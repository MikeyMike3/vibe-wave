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
import likedSongsImage from '../assets/imgs/VibeWave_Liked_Songs_3D.jpg';
import { useFetchUniqueArtists } from '../hooks/apis/useFetchUniqueArtists';
import { PlaylistItemsArtist } from '../components/userPlaylistPageComp/PlaylistItemsArtist';

export const LikedSongs = () => {
  const { savedTracks, isLoading, isError } = useFetchSavedTracks();
  const uniqueArtists = useFetchUniqueArtists(savedTracks?.items);

  const [input, setInput] = useState('');
  const [filteredPlaylistItems, setFilteredPlaylistItems] = useState<
    SpotifyApi.SavedTrackObject[] | undefined
  >();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;
    setInput(input);
    const lowerCaseInput = input.toLowerCase();
    const filtered = savedTracks?.items.filter(
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
                playlistName={'Liked Songs'}
                playlistOwnerName={'Spotify'}
                playlistLength={savedTracks?.items.length}
                playlistTotalTime={formatTimeInHours(savedTracks?.items)}
              />
              <UserItemsSearchBar
                handleInputChangeFunction={handleInputChange}
                placeholder="Search Liked Songs"
              />
            </PlaylistItemsHeaderFlexContainer>

            <PlaylistItemsButtonsFlexContainer>
              <PlayLikedTracksButton likedTracks={savedTracks?.items} />
              <ShuffleTracksButton />
            </PlaylistItemsButtonsFlexContainer>

            {input.length > 0 && filteredPlaylistItems?.length === 0 ? (
              <p>No Results Found.</p>
            ) : (
              <PlaylistItemsTable shouldIncludeAlbum={true}>
                {(filteredPlaylistItems && filteredPlaylistItems.length > 0
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
                    filteredPlaylist={filteredPlaylistItems as SpotifyApi.PlaylistTrackObject[]}
                  />
                ))}
              </PlaylistItemsTable>
            )}
          </PlaylistTableColumnFlexContainer>
        </div>
        <div className="sticky top-5 overflow-y-auto" style={{ height: 'calc(100vh - 250px)' }}>
          <img src={likedSongsImage}></img>
          <p className="py-2 text-textPrimary lg:py-4">Your personal collection of favorites!</p>
          {uniqueArtists.uniqueArtists.length > 0 && (
            <>
              <h2 className="py-1 text-textPrimary lg:py-2 lg:text-xl">Featuring: </h2>
              <div className="flex flex-col gap-4 lg:pt-4">
                {uniqueArtists.uniqueArtists.map(item => (
                  <PlaylistItemsArtist
                    key={item.id}
                    id={item.id}
                    images={item.images}
                    name={item.name}
                  />
                ))}
              </div>
            </>
          )}
        </div>
      </PlaylistItemsGrid>
    </Wrapper>
  );
};

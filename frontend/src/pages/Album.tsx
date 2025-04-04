import { useParams } from 'react-router-dom';
import { useFetchAlbum } from '../hooks/apis/useFetchAlbum';
import { MainLoading } from '../components/MainLoading';
import { ErrorMessage } from '../components/ErrorMessage';
import { Wrapper } from '../components/styledComponents/Wrapper';
import { PlaylistItemsHeader } from '../components/userPlaylistPageComp/PlaylistItemsHeader';
import { formatTimeInHours } from '../functions/formatTimeInHours';
import { PlaylistTableColumnFlexContainer } from '../components/userPlaylistPageComp/PlaylistTableColumnFlexContainer';
import { ShuffleTracksButton } from '../components/spotifyPlayer/ShuffleTracksButton';
import { PlaylistItemsButtonsFlexContainer } from '../components/userPlaylistPageComp/PlaylistItemsButtonsFlexContainer';
import { PlaylistItemsTable } from '../components/userPlaylistPageComp/PlaylistItemsTable';
import { AlbumItemsTR } from '../components/albumPageComponents/AlbumItemsTR';
import { PlaylistImage } from '../components/PlaylistImage';
import { PlayAlbumTracksPlayButton } from '../components/albumPageComponents/PlayAlbumTracksPlayButton';
import { useState } from 'react';
import { UserItemsSearchBar } from '../components/UserItemsSearchBar';
import { OpenInSpotifyButton } from '../components/OpenInSpotifyButton';
import { AlbumTrackWithImage } from '../types/AlbumTrackWithImage';

export const Album = () => {
  const { albumId } = useParams();
  const { album, isLoading, isError } = useFetchAlbum(albumId);

  const [filteredAlbumItemsArray, setFilteredAlbumItemsArray] = useState<
    SpotifyApi.TrackObjectSimplified[] | undefined
  >();
  const [input, setInput] = useState('');

  const handleInputOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;
    setInput(input);
    const lowerCaseInput = input.toLowerCase();

    const filtered = album?.tracks.items.filter(
      item =>
        item.name.toLowerCase().includes(lowerCaseInput) ||
        album.artists.some(artist => artist.name.toLowerCase().includes(lowerCaseInput)),
    );
    setFilteredAlbumItemsArray(filtered);
  };

  if (isLoading) {
    return <MainLoading />;
  }

  if (isError) {
    return <ErrorMessage />;
  }

  return (
    <Wrapper>
      <PlaylistTableColumnFlexContainer>
        <div className="flex flex-col gap-2 text-white sm:flex-row md:flex-row md:gap-0">
          {/* @ts-expect-error the images below works as intended*/}
          <PlaylistImage images={album?.images} alt={album?.name} responsiveImage={true} />
          <div className="flex flex-col justify-end gap-4 md:pl-4">
            <PlaylistItemsHeader
              playlistName={album?.name}
              playlistOwnerName={album?.artists[0].name}
              playlistLength={album?.tracks.total}
              playlistTotalTime={formatTimeInHours(album?.tracks.items)}
              artistId={album?.artists[0].id}
              albumReleaseDate={album?.release_date}
            />
            <OpenInSpotifyButton spotifyUrl={album?.external_urls.spotify} isNotFullWidth={true} />
            <UserItemsSearchBar
              handleInputChangeFunction={handleInputOnChange}
              placeholder="Search Album Tracks"
            />
            <PlaylistItemsButtonsFlexContainer>
              {/* <PlayLikedTracksButton likedTracks={album?.tracks.items} /> */}
              <PlayAlbumTracksPlayButton album={album} />
              <ShuffleTracksButton />
            </PlaylistItemsButtonsFlexContainer>
          </div>
        </div>

        <PlaylistItemsTable>
          {input.length > 0 && filteredAlbumItemsArray?.length === 0 ? (
            <p>No tracks found.</p>
          ) : (
            (filteredAlbumItemsArray && filteredAlbumItemsArray.length > 0
              ? filteredAlbumItemsArray
              : album?.tracks?.items
            )?.map((item, index) => (
              <AlbumItemsTR
                key={item.id || index} // Ensure a unique key
                position={index + 1}
                images={(item as AlbumTrackWithImage).images}
                trackName={item.name}
                artists={item.artists}
                trackLength={item.duration_ms}
                track={item as AlbumTrackWithImage}
                trackId={item.id}
                album={album}
                filteredAlbumItemsArray={filteredAlbumItemsArray}
              />
            ))
          )}
        </PlaylistItemsTable>
      </PlaylistTableColumnFlexContainer>
    </Wrapper>
  );
};

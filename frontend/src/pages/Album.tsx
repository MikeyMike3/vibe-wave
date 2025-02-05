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
import { getImageUrl } from '../functions/getImageUrl';
import { PlaylistImage } from '../components/PlaylistImage';
import { PlayAlbumTracksPlayButton } from '../components/albumPageComponents/PlayAlbumTracksPlayButton';
import { useState } from 'react';
import { UserItemsSearchBar } from '../components/UserItemsSearchBar';
import { OpenInSpotifyButton } from '../components/OpenInSpotifyButton';

export const Album = () => {
  const { albumId } = useParams();
  const { album, isLoading, isError } = useFetchAlbum(albumId);

  const [filteredAlbumItemsArray, setFilteredAlbumItemsArray] = useState<
    SpotifyApi.TrackObjectSimplified[] | undefined
  >();
  const [input, setInput] = useState('');

  const image = getImageUrl(album?.images);

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
        <div className="flex">
          {/* @ts-expect-error the images below works as intended*/}
          <PlaylistImage images={album?.images} alt={album?.name} />
          <div className="flex flex-col justify-end gap-3 pl-4">
            <OpenInSpotifyButton spotifyUrl={album?.external_urls.spotify} />
            <PlaylistItemsHeader
              playlistName={album?.name}
              playlistOwnerName={album?.artists[0].name}
              playlistLength={album?.tracks.total}
              playlistTotalTime={formatTimeInHours(album?.tracks.items)}
              artistId={album?.artists[0].id}
              albumReleaseDate={album?.release_date}
            />
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
                image={image}
                trackName={item.name}
                artists={item.artists}
                trackLength={item.duration_ms}
                track={item}
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

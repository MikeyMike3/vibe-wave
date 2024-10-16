import { useParams } from 'react-router-dom';
import { useFetchAlbum } from '../hooks/apis/useFetchAlbum';
import { MainLoading } from '../components/MainLoading';
import { ErrorMessage } from '../components/ErrorMessage';
import { Wrapper } from '../components/styledComponents/Wrapper';
import { PlaylistItemsGrid } from '../components/userPlaylistPageComp/PlaylistItemsGrid';
import { PlaylistItemsHeader } from '../components/userPlaylistPageComp/PlaylistItemsHeader';
import { formatTimeInHours } from '../functions/formatTimeInHours';
import { PlaylistItemsHeaderFlexContainer } from '../components/userPlaylistPageComp/PlaylistItemsHeaderFlexContainer';
import { PlaylistTableColumnFlexContainer } from '../components/userPlaylistPageComp/PlaylistTableColumnFlexContainer';
import { ShuffleTracksButton } from '../components/spotifyPlayer/ShuffleTracksButton';
import { PlaylistItemsButtonsFlexContainer } from '../components/userPlaylistPageComp/PlaylistItemsButtonsFlexContainer';
import { PlaylistItemsTable } from '../components/userPlaylistPageComp/PlaylistItemsTable';
import { AlbumItemsTR } from '../components/albumPageComponents/AlbumItemsTR';
import { getImageUrl } from '../functions/getImageUrl';
import { useState, useEffect } from 'react';
import { getBackgroundImageColor } from '../functions/getBackgroundImageColor';

export const Album = () => {
  const { albumId } = useParams();
  const { album, isLoading, isError } = useFetchAlbum(albumId);
  const [backgroundColor, setBackgroundColor] = useState<string>('');

  const image = getImageUrl(album?.images);

  useEffect(() => {
    if (image) {
      getBackgroundImageColor(image, setBackgroundColor);
    }
  }, [image]);

  if (isLoading) {
    return <MainLoading />;
  }

  if (isError) {
    return <ErrorMessage />;
  }

  return (
    <div
      className="text-white"
      style={{
        backgroundImage: `linear-gradient(0deg, rgba(0,0,0,1) 10%, ${backgroundColor} 100%)`,
        backgroundAttachment: 'fixed',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <Wrapper>
        <PlaylistItemsGrid>
          <PlaylistTableColumnFlexContainer>
            <PlaylistItemsHeaderFlexContainer>
              <PlaylistItemsHeader
                playlistName={album?.name}
                playlistOwnerName={album?.artists[0].name}
                playlistLength={album?.tracks.total}
                playlistTotalTime={formatTimeInHours(album?.tracks.items)}
              />
            </PlaylistItemsHeaderFlexContainer>
            <PlaylistItemsButtonsFlexContainer>
              {/* <PlayLikedTracksButton likedTracks={album?.tracks.items} /> */}
              <ShuffleTracksButton />
            </PlaylistItemsButtonsFlexContainer>
            <PlaylistItemsTable>
              {album?.tracks.items.map((item, index) => (
                <AlbumItemsTR
                  key={item.id}
                  position={index + 1}
                  trackName={item.name}
                  artists={item.artists}
                  trackLength={item.duration_ms}
                  track={item}
                  trackId={item.id}
                  image={image}
                />
              ))}
            </PlaylistItemsTable>
          </PlaylistTableColumnFlexContainer>
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
    </div>
  );
};

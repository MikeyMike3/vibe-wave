import { useParams } from 'react-router-dom';
import { useGetPlaylistItems } from '../hooks/apis/useGetPlaylistItems';
import { MainLoading } from '../components/MainLoading';
import { ErrorMessage } from '../components/ErrorMessage';
import { useFetchPlaylistDetails } from '../hooks/apis/useFetchPlaylistDetails';
import { getImageUrl } from '../functions/getImageUrl';
import { ShuffleTracksButton } from '../components/spotifyPlayer/ShuffleTracksButton';
import { useFetchArtistImagesAndGenres } from '../hooks/apis/useFetchArtistInfoForTracks';
import { Wrapper } from '../components/styledComponents/Wrapper';
import { getBackgroundImageColor } from '../functions/getBackgroundImageColor';
import { useEffect, useState } from 'react';
import { PlaylistPagePlayButton } from '../components/PlaylistPagePlayButton';
import { PlaylistItemsTable } from '../components/userPlaylistPageComp/PlaylistItemsTable';
import { PlaylistItemsHeader } from '../components/userPlaylistPageComp/PlaylistItemsHeader';
import { PlaylistItemsGenres } from '../components/userPlaylistPageComp/PlaylistItemsGenres';
import { PlaylistImage } from '../components/PlaylistImage';
import { PlaylistItemsArtist } from '../components/userPlaylistPageComp/PlaylistItemsArtist';
import { PlaylistItemsTR } from '../components/userPlaylistPageComp/PlaylistItemsTR';

export const UserPlaylistItems = () => {
  const { playlistId } = useParams();

  // I need to make another hook that combines these together so that I can Promise.All these together
  const { playlistItems, isLoading, isError } = useGetPlaylistItems(playlistId);
  const { playlistDetails } = useFetchPlaylistDetails(playlistId);
  const { data: artistInfo } = useFetchArtistImagesAndGenres(playlistItems?.items);

  const [backgroundColor, setBackgroundColor] = useState<string>('');

  const image = getImageUrl(playlistDetails?.images);

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
      style={{
        backgroundImage: `linear-gradient(0deg, rgba(0,0,0,1) 10%, ${backgroundColor} 100%)`,
        backgroundAttachment: 'fixed',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <Wrapper>
        <div className="grid grid-cols-[1fr_300px] gap-5 text-white">
          <div>
            <div className="flex flex-col gap-5 pb-5">
              <div className="flex flex-col gap-5">
                <PlaylistItemsHeader
                  playlistDetails={playlistDetails}
                  playlistItems={playlistItems}
                />
              </div>

              <div className="flex gap-6">
                <PlaylistPagePlayButton
                  playlistItems={playlistItems}
                  playlistDetails={playlistDetails}
                  playlistId={playlistId}
                />
                <ShuffleTracksButton />
              </div>

              <PlaylistItemsTable>
                {playlistItems?.items.map((item, index) => (
                  <PlaylistItemsTR
                    position={index + 1}
                    images={item.track?.album.images}
                    trackName={item.track?.name}
                    artists={item.track?.artists}
                    albumId={item.track?.album.id}
                    albumName={item.track?.album.name}
                    trackLength={item.track?.duration_ms}
                    track={item}
                    trackId={item.track?.id}
                  />
                ))}
              </PlaylistItemsTable>
            </div>
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
        </div>
      </Wrapper>
    </div>
  );
};

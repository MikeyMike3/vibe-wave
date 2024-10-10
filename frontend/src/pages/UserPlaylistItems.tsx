import { Link, useParams } from 'react-router-dom';
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

              <PlaylistItemsTable playlistItems={playlistItems} />
            </div>
          </div>
          <div className="sticky top-5 overflow-y-auto" style={{ height: 'calc(100vh - 210px)' }}>
            <div>
              <img className="h-80 object-cover pb-5" src={image} alt={playlistDetails?.name} />

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
                    <Link
                      to={`/artist/${item.track?.artists[0].id}`}
                      key={item.track?.id}
                      className="group flex items-center gap-3"
                    >
                      <img
                        className="h-16 w-16 rounded-full"
                        src={artist?.images[0]?.url}
                        alt={item.track?.artists[0]?.name}
                      />

                      <p className="group-hover:underline">{item.track?.artists[0]?.name}</p>
                    </Link>
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

import { Link, useParams } from 'react-router-dom';
import { useGetPlaylistItems } from '../hooks/apis/useGetPlaylistItems';
import { TrackInfo } from '../components/TrackInfo';
import { PlaylistItemKebabMenu } from '../components/kebabMenu/PlaylistItemKebabMenu';
import { MainLoading } from '../components/MainLoading';
import { ErrorMessage } from '../components/ErrorMessage';
import { useFetchPlaylistDetails } from '../hooks/apis/useFetchPlaylistDetails';
import { getImageUrl } from '../functions/getImageUrl';
import { ShuffleTracksButton } from '../components/spotifyPlayer/ShuffleTracksButton';
import { useFetchArtistImagesAndGenres } from '../hooks/apis/useFetchArtistInfoForTracks';
import { capitalizeFirstLetterOfEachWord } from '../functions/capitalizeFirstLetterOfEachWord';
import { Wrapper } from '../components/styledComponents/Wrapper';
import { formatTimeInHours } from '../functions/formatTimeInHours';
import { formatTime } from '../functions/formatTime';
import { getBackgroundImageColor } from '../functions/getBackgroundImageColor';
import { useEffect, useState } from 'react';
import { PlaylistPagePlayButton } from '../components/PlaylistPagePlayButton';

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
                <h1 className="text-5xl font-semibold text-textPrimary">{playlistDetails?.name}</h1>
                <p className="text-textAccent">
                  By:{' '}
                  <span className="text-textPrimary">{playlistDetails?.owner.display_name}</span>{' '}
                  <span className="text-textPrimary">&#8226;</span> {playlistItems?.items.length}{' '}
                  songs
                  <span className="text-textPrimary"> &#8226;</span>{' '}
                  {formatTimeInHours(playlistItems?.items)}
                </p>
              </div>

              <div className="flex gap-6">
                <PlaylistPagePlayButton
                  playlistItems={playlistItems}
                  playlistDetails={playlistDetails}
                  playlistId={playlistId}
                />
                <ShuffleTracksButton />
              </div>
            </div>
            <table className="w-full table-auto text-textAccent">
              <thead className="border-b-2 border-textAccent">
                <tr className="p-2 text-left">
                  <th className="p-2">#</th>
                  <th className="p-2">Title</th>
                  <th className="p-2">Album</th>
                  <th className="p-2 text-left">Duration</th>
                </tr>
              </thead>
              <tbody>
                {playlistItems?.items.map((item, index) => {
                  return (
                    <tr key={item.track?.id} className="group">
                      <td className="p-2 group-hover:text-textPrimary">{index + 1}</td>
                      <td className="p-2">
                        <TrackInfo
                          images={item.track?.album.images}
                          name={item.track?.name}
                          artists={item.track?.artists}
                        />
                      </td>
                      <td className="p-2 group-hover:text-textPrimary">
                        <Link
                          className="hover:text-textPrimary hover:underline"
                          to={`/album/${item.track?.album.id}`}
                        >
                          {item.track?.album.name}
                        </Link>
                      </td>
                      <td className="p-2 group-hover:text-textPrimary">
                        {formatTime(item.track?.duration_ms)}
                      </td>

                      <td className="opacity-0 group-hover:opacity-100">
                        <PlaylistItemKebabMenu track={item} />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <div className="sticky top-5 overflow-y-auto" style={{ height: 'calc(100vh - 210px)' }}>
            <div>
              <img className="h-80 object-cover pb-5" src={image} alt={playlistDetails?.name} />

              <div className="flex flex-wrap gap-3">
                {artistInfo?.genres.slice(0, 3).map(item => (
                  <p
                    key={item}
                    className="rounded-3xl border-2 border-textPrimary px-4 py-2 text-textPrimary"
                  >
                    {capitalizeFirstLetterOfEachWord(item)}
                  </p>
                ))}
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

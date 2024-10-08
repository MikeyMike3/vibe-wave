import { Link, useParams } from 'react-router-dom';
import { useGetPlaylistItems } from '../hooks/apis/useGetPlaylistItems';
import { TrackInfo } from '../components/TrackInfo';
import { PlaylistItemKebabMenu } from '../components/kebabMenu/PlaylistItemKebabMenu';
import { MainLoading } from '../components/MainLoading';
import { ErrorMessage } from '../components/ErrorMessage';
import { useFetchPlaylistDetails } from '../hooks/apis/useFetchPlaylistDetails';
import { getImageUrl } from '../functions/getImageUrl';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCirclePlay } from '@awesome.me/kit-71c07605c0/icons/sharp/solid';
import { ShuffleTracksButton } from '../components/spotifyPlayer/ShuffleTracksButton';
import { useFetchArtistImagesAndGenres } from '../hooks/apis/useFetchArtistInfoForTracks';
import { capitalizeFirstLetterOfEachWord } from '../functions/capitalizeFirstLetterOfEachWord';
import { Wrapper } from '../components/styledComponents/Wrapper';
import { formatTimeInHours } from '../functions/formatTimeInHours';
import { formatTime } from '../functions/formatTime';
import { faClock as faClockRegular } from '@awesome.me/kit-71c07605c0/icons/sharp/regular';

export const UserPlaylistItems = () => {
  const { playlistId } = useParams();

  // I need to make another hook that combines these together so that I can Promise.All these together
  const { playlistItems, isLoading, isError } = useGetPlaylistItems(playlistId);
  const { playlistDetails } = useFetchPlaylistDetails(playlistId);
  const { data: artistInfo } = useFetchArtistImagesAndGenres(playlistItems?.items);

  if (isLoading) {
    return <MainLoading />;
  }

  if (isError) {
    return <ErrorMessage />;
  }

  const image = getImageUrl(playlistDetails?.images);

  return (
    <div
      style={{
        background: 'linear-gradient(0deg, rgba(0,0,0,1) 10%, rgba(28, 37, 82,1) 100%)',
        backgroundAttachment: 'fixed', // Fixes the background when scrolling
        backgroundSize: 'cover', // Ensures the background covers the entire element
      }}
    >
      <Wrapper>
        <div className="grid grid-cols-[1fr_300px] gap-5 pt-5 text-white">
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
                <FontAwesomeIcon className="text-6xl" icon={faCirclePlay} color="aqua" />
                <ShuffleTracksButton />
              </div>
            </div>
            <table className="w-full table-auto text-textAccent">
              <thead className="border-b-2 border-textAccent">
                <tr className="p-2 text-left">
                  <th className="p-2">#</th>
                  <th className="p-2">Title</th>
                  <th className="p-2">Album</th>
                  <th className="p-2 text-center">
                    <FontAwesomeIcon className="text-textAccent" icon={faClockRegular} />
                  </th>
                </tr>
              </thead>

              {playlistItems?.items.map((item, index) => {
                return (
                  <tr key={item.track?.id} className="group">
                    <td className="p-2">{index + 1}</td>
                    <td className="p-2">
                      <TrackInfo
                        images={item.track?.album.images}
                        name={item.track?.name}
                        artists={item.track?.artists}
                      />
                    </td>
                    <td className="p-2">
                      <Link
                        className="hover:text-textPrimary hover:underline"
                        to={`/album/${item.track?.album.id}`}
                      >
                        {item.track?.album.name}
                      </Link>
                    </td>
                    <td className="p-2">{formatTime(item.track?.duration_ms)}</td>

                    <td className="opacity-0 group-hover:opacity-100">
                      <PlaylistItemKebabMenu track={item} />
                    </td>
                  </tr>
                );
              })}
            </table>
          </div>
          <div className="sticky top-5 overflow-y-auto" style={{ height: 'calc(100vh - 210px)' }}>
            <div>
              <img className="h-80 object-cover pb-5" src={image} alt={playlistDetails?.name} />

              <div className="flex flex-wrap gap-3">
                {artistInfo?.genres.slice(0, 3).map(item => (
                  <p
                    key={item}
                    className="rounded-3xl border-2 border-textPrimary p-3 px-5 text-textPrimary"
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
                    <div key={item.track?.id} className="flex items-center gap-4">
                      <img
                        className="h-16 w-16 rounded-full"
                        src={artist?.images[0]?.url}
                        alt={item.track?.artists[0]?.name}
                      />
                      <div>
                        <Link
                          to={`/artist/${item.track?.artists[0].id}`}
                          className="text-textPrimary hover:underline"
                        >
                          {item.track?.artists[0]?.name}
                        </Link>
                      </div>
                    </div>
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

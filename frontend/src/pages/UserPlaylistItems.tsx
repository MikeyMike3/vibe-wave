import { useParams } from 'react-router-dom';
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

export const UserPlaylistItems = () => {
  const { playlistId } = useParams();

  // I need to make another hook that combines these together so that I can Promise.All these together
  const { playlistItems, isLoading, isError } = useGetPlaylistItems(playlistId);
  const { playlistDetails } = useFetchPlaylistDetails(playlistId);

  if (isLoading) {
    return <MainLoading />;
  }

  if (isError) {
    return <ErrorMessage />;
  }

  const image = getImageUrl(playlistDetails?.images);

  return (
    <div className="mx-auto max-w-[98%]">
      <div className="grid grid-cols-[1fr_300px] gap-5 pt-5 text-white">
        <div>
          <div className="flex flex-col gap-5 pb-5">
            <div className="flex flex-col gap-5">
              <h1 className="text-4xl text-textPrimary">{playlistDetails?.name}</h1>
              <p className="text-textAccent">
                By: <span className="text-textPrimary">Michael Morgan</span>{' '}
                <span className="text-textPrimary">&#8226;</span> {playlistItems?.items.length}{' '}
                songs
                <span className="text-textPrimary"> &#8226;</span> Total Time of songs
              </p>
            </div>

            <div className="flex gap-6">
              <FontAwesomeIcon className="text-6xl" icon={faCirclePlay} color="aqua" />
              <ShuffleTracksButton />
            </div>
          </div>
          {playlistItems?.items.map(item => {
            return (
              <div
                key={item.track?.id}
                className="flex w-full items-center justify-between py-2 pl-2 hover:bg-bgAccent"
              >
                <TrackInfo
                  images={item.track?.album.images}
                  name={item.track?.name}
                  artists={item.track?.artists}
                />
                <PlaylistItemKebabMenu track={item} />
              </div>
            );
          })}
        </div>
        <div>
          <div className="sticky top-5">
            <img src={image} alt={playlistDetails?.name} />
            <div className="flex">
              <p></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

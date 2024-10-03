import { useParams } from 'react-router-dom';
import { useGetPlaylistItems } from '../hooks/apis/useGetPlaylistItems';
import { TrackInfo } from '../components/TrackInfo';
import { PlaylistItemKebabMenu } from '../components/kebabMenu/PlaylistItemKebabMenu';
import { MainLoading } from '../components/MainLoading';
import { ErrorMessage } from '../components/ErrorMessage';

export const UserPlaylistItems = () => {
  const { playlistId } = useParams();

  const { playlistItems, isLoading, isError } = useGetPlaylistItems(playlistId);

  if (isLoading) {
    return <MainLoading />;
  }

  if (isError) {
    return <ErrorMessage />;
  }

  return (
    <div className="text-white">
      {playlistItems?.items.map(item => (
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
      ))}
    </div>
  );
};

import { useParams } from 'react-router-dom';
import { useGetPlaylistItems } from '../hooks/apis/useGetPlaylistItems';
import { TrackInfo } from '../components/TrackInfo';
import { PlaylistItemKebabMenu } from '../components/kebabMenu/PlaylistItemKebabMenu';

export const UserPlaylistPage = () => {
  const { playlistId } = useParams();

  const { playlistItems } = useGetPlaylistItems(playlistId, true);

  return (
    <div className="text-white">
      {playlistItems?.items.map(item => (
        <div key={item.track?.id} className="flex items-center justify-between gap-4">
          <TrackInfo
            images={item.track?.album.images}
            name={item.track?.name}
            artists={item.track?.artists}
            shouldAddPadding={true}
          />
          <PlaylistItemKebabMenu track={item} />
        </div>
      ))}
    </div>
  );
};

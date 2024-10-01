import { useParams } from 'react-router-dom';
import { useGetPlaylistItems } from '../hooks/apis/useGetPlaylistItems';
import { TrackInfo } from '../components/TrackInfo';

export const UserPlaylistPage = () => {
  const { playlistId } = useParams();

  const { playlistItems } = useGetPlaylistItems(playlistId, true);

  return (
    <div className="text-white">
      {playlistItems?.items.map(item => (
        <TrackInfo
          images={item.track?.album.images}
          name={item.track?.name}
          artists={item.track?.artists}
          shouldAddPadding={true}
        />
      ))}
    </div>
  );
};

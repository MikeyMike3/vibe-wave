import { useParams } from 'react-router-dom';
import { useGetPlaylistItems } from '../hooks/apis/useGetPlaylistItems';

export const UserPlaylistPage = () => {
  const { playlistId } = useParams();

  const { playlistItems } = useGetPlaylistItems(playlistId, true);

  return (
    <div className="text-white">{playlistItems?.items.map(item => <p>{item.track?.uri}</p>)}</div>
  );
};

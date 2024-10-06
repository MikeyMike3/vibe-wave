import { useParams } from 'react-router-dom';
import { SearchResultAlbumItem } from '../components/SearchResultAlbumItem';

export const Album = () => {
  const { albumId } = useParams();
  return <div className="text-white">{albumId}</div>;
};

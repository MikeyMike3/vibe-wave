import { useParams } from 'react-router-dom';
import { useFetchAlbum } from '../hooks/apis/useFetchAlbum';
import { MainLoading } from '../components/MainLoading';
import { ErrorMessage } from '../components/ErrorMessage';

export const Album = () => {
  const { albumId } = useParams();
  const { album, isLoading, isError } = useFetchAlbum(albumId);

  if (isLoading) {
    return <MainLoading />;
  }

  if (isError) {
    return <ErrorMessage />;
  }

  return (
    <div className="text-white">
      <p>{album?.name}</p>
    </div>
  );
};

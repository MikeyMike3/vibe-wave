import { ErrorMessage } from '../components/ErrorMessage';
import { MainLoading } from '../components/MainLoading';
import { useFetchSavedAlbums } from '../hooks/apis/useFetchSavedAlbums';

export const SavedAlbums = () => {
  const { savedAlbums, isError, isLoading } = useFetchSavedAlbums();

  if (isLoading) {
    return <MainLoading />;
  }

  if (isError) {
    return <ErrorMessage />;
  }

  return (
    <div className="text-white">{savedAlbums?.items.map(item => <p>{item.album.name}</p>)}</div>
  );
};

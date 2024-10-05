import { ErrorMessage } from '../components/ErrorMessage';
import { MainLoading } from '../components/MainLoading';
import { SearchResultAlbumItem } from '../components/SearchResultAlbumItem';
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
    <div className="text-white">
      <div className="grid grid-cols-[repeat(auto-fit,_minmax(250px,_1fr))] gap-7">
        {savedAlbums?.items.map(item => (
          <SearchResultAlbumItem key={item.album.id} album={item.album} />
        ))}
      </div>
    </div>
  );
};

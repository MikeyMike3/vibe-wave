import { ErrorMessage } from '../components/ErrorMessage';
import { MainLoading } from '../components/MainLoading';
import { SearchResultAlbumItem } from '../components/SearchResultAlbumItem';
import { GridContainer } from '../components/styledComponents/GridContainer';
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
      <GridContainer>
        {savedAlbums?.items.map(item => (
          <SearchResultAlbumItem key={item.album.id} album={item.album} />
        ))}
      </GridContainer>
    </div>
  );
};

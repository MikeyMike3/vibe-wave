import { useParams } from 'react-router-dom';
import { useFetchArtistDetails } from '../hooks/apis/useFetchArtistDetails';
import { MainLoading } from '../components/MainLoading';
import { ErrorMessage } from '../components/ErrorMessage';

export const Artist = () => {
  const { artistId } = useParams();
  const { artistDetails, isLoading, isError } = useFetchArtistDetails(artistId);

  if (isLoading) {
    return <MainLoading />;
  }

  if (isError) {
    return <ErrorMessage />;
  }

  console.log(artistDetails);
  return <div className="text-white">Artist</div>;
};

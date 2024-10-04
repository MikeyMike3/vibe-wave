import { useParams } from 'react-router-dom';
import { useGetPlaylistItems } from '../hooks/apis/useGetPlaylistItems';
import { TrackInfo } from '../components/TrackInfo';
import { PlaylistItemKebabMenu } from '../components/kebabMenu/PlaylistItemKebabMenu';
import { MainLoading } from '../components/MainLoading';
import { ErrorMessage } from '../components/ErrorMessage';
import { useFetchPlaylistDetails } from '../hooks/apis/useFetchPlaylistDetails';

export const UserPlaylistItems = () => {
  const { playlistId } = useParams();

  // I need to make another hook that combines these together so that I can Promise.All these together
  const { playlistItems, isLoading, isError } = useGetPlaylistItems(playlistId);
  const { playlistDetails } = useFetchPlaylistDetails(playlistId);

  if (isLoading) {
    return <MainLoading />;
  }

  if (isError) {
    return <ErrorMessage />;
  }

  return (
    <div className="text-white">
      <h1>{playlistDetails?.name}</h1>
      {<p>{playlistDetails?.owner.display_name}</p>}
      <p>{playlistDetails?.description}</p>
      <img src={playlistDetails?.images[0]?.url} alt={playlistDetails?.name} />
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

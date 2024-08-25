import { Link } from 'react-router-dom';
import { getImageUrl } from '../functions/getImageUrl';
import { useGetPlaylistItems } from '../hooks/apis/useGetPlaylistItems';

type UserPlaylistProps = {
  name: string;
  owner: string | undefined;
  type: string;
  images: SpotifyApi.ImageObject[];
  playlistId: string;
};

export const UserPlaylist = ({ name, images, owner, type, playlistId }: UserPlaylistProps) => {
  const getPlaylistItems = useGetPlaylistItems(playlistId);

  const image = getImageUrl(images);

  return (
    <Link to={'/party-mode/search'}>
      <div className="flex w-full items-center gap-2 py-2 hover:bg-blue-50">
        <img className="h-20 w-20" src={image} />
        <div className="flex flex-col">
          <p>{name}</p>
          <p>
            {type} + {owner}
          </p>
          <button onClick={getPlaylistItems}>Play</button>
        </div>
      </div>
      //
    </Link>
  );
};

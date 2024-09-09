import { Link } from 'react-router-dom';
import { getImageUrl } from '../functions/getImageUrl';
import { PlaylistPlayButton } from './spotifyPlayer/PlaylistPlayButton';

type UserPlaylistProps = {
  name: string;
  owner: string | undefined;
  type: string;
  images: SpotifyApi.ImageObject[];
  playlistId: string;
};

export const UserPlaylist = ({ name, images, owner, type, playlistId }: UserPlaylistProps) => {
  const image = getImageUrl(images);

  return (
    <Link to={'/party-mode/search'}>
      <div className="hover:bg-bgAccent group flex h-full w-full flex-col gap-2 rounded-xl p-2 duration-300">
        <div
          className="relative h-64 w-full rounded-xl bg-cover bg-center"
          style={{
            backgroundImage: `url(${image})`,
          }}
        >
          <PlaylistPlayButton name={name} playlistId={playlistId} />
        </div>

        <div className="text-textAccent flex flex-col py-2">
          <p className="text-textPrimary">{name}</p>
          <p>
            {type} &#8226; {owner}
          </p>
        </div>
      </div>
    </Link>
  );
};

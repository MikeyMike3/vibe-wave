import { Link } from 'react-router-dom';
import { getImageUrl } from '../functions/getImageUrl';
import { PlaylistPlayButton } from './spotifyPlayer/PlaylistPlayButton';
import { capitalizeFirstLetter } from '../functions/capitalizeFirstLetter';

type UserPlaylistProps = {
  name: string;
  owner: string | undefined;
  type: string;
  images: SpotifyApi.ImageObject[];
  playlistId: string;
};

export const UserPlaylist = ({ name, images, owner, type, playlistId }: UserPlaylistProps) => {
  const image = getImageUrl(images);
  const uppercaseType = capitalizeFirstLetter(type);

  return (
    <Link to={`${playlistId}`}>
      <div className="group flex h-full w-full flex-col gap-2 rounded-xl p-2 duration-300 hover:bg-bgAccent">
        <div
          className="relative h-64 w-full rounded-xl bg-cover bg-center"
          style={{
            backgroundImage: `url(${image})`,
          }}
        >
          <PlaylistPlayButton name={name} playlistId={playlistId} />
        </div>

        <div className="flex flex-col py-2 text-textAccent">
          <p className="text-smTitle text-aqua">{name}</p>
          <p className="text-base">
            {uppercaseType} &#8226; {owner}
          </p>
        </div>
      </div>
    </Link>
  );
};

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
      <div className="group flex h-full w-full flex-col gap-2 rounded-xl p-2 duration-300 lg:hover:bg-bgAccent">
        <div
          className="relative w-full rounded-xl bg-cover bg-center pt-[100%]"
          style={{
            backgroundImage: `url(${image})`,
          }}
        >
          <PlaylistPlayButton name={name} playlistId={playlistId} />
        </div>

        <div className="flex flex-col py-2 text-textAccent">
          <p className="line-clamp-1 text-smTitle text-textPrimary lg:group-hover:text-aqua">
            {name}
          </p>
          <p className="line-clamp-1 text-base lg:group-hover:text-[#00CCCC]">
            {uppercaseType} &#8226; {owner}
          </p>
        </div>
      </div>
    </Link>
  );
};

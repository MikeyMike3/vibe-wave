import { Link } from 'react-router-dom';
import { getImageUrl } from '../functions/getImageUrl';
import { useGetPlaylistItemsAndPlay } from '../hooks/useGetPlaylistItemsAndPlay';
import { useSpotifyPlayerContext } from '../hooks/context/useSpotifyPlayerContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCirclePlay } from '@fortawesome/free-solid-svg-icons';

type UserPlaylistProps = {
  name: string;
  owner: string | undefined;
  type: string;
  images: SpotifyApi.ImageObject[];
  playlistId: string;
};

export const UserPlaylist = ({ name, images, owner, type, playlistId }: UserPlaylistProps) => {
  const { isPlayerReady } = useSpotifyPlayerContext();
  const getPlaylistItemsAndPlay = useGetPlaylistItemsAndPlay(playlistId, name);

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
          {isPlayerReady && (
            <button
              className="absolute bottom-2 right-2 z-20 rounded-full bg-black opacity-0 duration-300 hover:scale-105 group-hover:opacity-100"
              onClick={getPlaylistItemsAndPlay}
            >
              <FontAwesomeIcon icon={faCirclePlay} size="4x" color="aqua" />
            </button>
          )}
        </div>

        <div className="text-textAccent flex flex-col">
          <p className="text-textPrimary">{name}</p>
          <p>
            {type} &#8226; {owner}
          </p>
        </div>
      </div>
    </Link>
  );
};

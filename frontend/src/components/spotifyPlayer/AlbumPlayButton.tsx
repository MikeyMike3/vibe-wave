import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCirclePlay } from '@awesome.me/kit-71c07605c0/icons/sharp/solid';

import { useSpotifyPlayerContext } from '../../hooks/context/useSpotifyPlayerContext';

type AlbumPlayButtonProps = {
  albumId: string;
  name: string;
};

export const AlbumPlayButton = ({ albumId, name }: AlbumPlayButtonProps) => {
  const { isPlayerReady } = useSpotifyPlayerContext();

  return (
    isPlayerReady && (
      <button
        className="absolute bottom-2 right-2 rounded-full bg-black opacity-0 duration-300 hover:scale-105 group-hover:opacity-100"
        onClick={e => {
          e.preventDefault();

          //   getPlaylistItemsAndPlay();
        }}
      >
        <FontAwesomeIcon className="text-6xl" icon={faCirclePlay} color="aqua" />
      </button>
    )
  );
};

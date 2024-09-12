import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCirclePlay } from '@awesome.me/kit-71c07605c0/icons/sharp/solid';
import { useGetPlaylistItemsAndPlay } from '../../hooks/useGetPlaylistItemsAndPlay';
import { useSpotifyPlayerContext } from '../../hooks/context/useSpotifyPlayerContext';

type PlaylistPlayButtonProps = {
  playlistId: string;
  name: string;
};

export const PlaylistPlayButton = ({ playlistId, name }: PlaylistPlayButtonProps) => {
  const { isPlayerReady } = useSpotifyPlayerContext();
  const getPlaylistItemsAndPlay = useGetPlaylistItemsAndPlay(playlistId, name);
  return (
    isPlayerReady && (
      <button
        className="absolute bottom-2 right-2 rounded-full bg-black opacity-0 duration-300 hover:scale-105 group-hover:opacity-100"
        onClick={e => {
          e.preventDefault();
          getPlaylistItemsAndPlay();
        }}
      >
        <FontAwesomeIcon className="text-6xl" icon={faCirclePlay} color="aqua" />
      </button>
    )
  );
};

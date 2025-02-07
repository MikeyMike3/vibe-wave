import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCirclePlay } from '@awesome.me/kit-71c07605c0/icons/sharp/solid';
import { usePlaybackContext } from '../hooks/context/usePlaybackContext';
import { useQueueContext } from '../hooks/context/useQueueContext';
import { useIndexPlaylistQueue } from '../hooks/spotifyPlayer/useIndexPlaylistQueue';
import { usePlaySong } from '../hooks/spotifyPlayer/usePlaySong';
import { useShuffleTracks } from '../hooks/spotifyPlayer/useShuffleTracks';
import { useSpotifyPlayerContext } from '../hooks/context/useSpotifyPlayerContext';
import { isPlaylistTrackObjectArray } from '../types/typeGuards/isPlaylistTrackObjectArray';
import { addToPlaylistQueueSessionStorage } from '../functions/sessionStorage/playlistQueue/addToPlaylistQueueSessionStorage';
import { addRepeatRefSessionStorage } from '../functions/sessionStorage/playback/repeat/addRepeatRefToSessionStorage';

type PlaylistDetails = {
  name: string;
  owner: {
    display_name: string;
  };
  images: {
    url: string;
    height: number | null;
    width: number | null;
  }[];
  description: string;
};

type PlaylistPagePlayButtonProps = {
  playlistItems: SpotifyApi.PlaylistTrackResponse | undefined;
  playlistDetails: PlaylistDetails | undefined;
  playlistId: string | undefined;
};

export const PlaylistPagePlayButton = ({
  playlistItems,
  playlistDetails,
  playlistId,
}: PlaylistPagePlayButtonProps) => {
  const { setPlaylistName, setPlaylistId, shuffleTracksRef, repeatRef, setRepeat } =
    usePlaybackContext();
  const { setPlaylistQueue, unShuffledQueueRef } = useQueueContext();
  const { isPlayerReady } = useSpotifyPlayerContext();
  const shuffleTracks = useShuffleTracks();
  const playSongMutation = usePlaySong();
  const indexPlaylistQueue = useIndexPlaylistQueue();

  const handleClick = () => {
    if (!playlistItems || !playlistDetails || !playlistId) {
      return;
    }

    setPlaylistQueue(playlistItems.items);
    setPlaylistName(playlistDetails?.name);
    setPlaylistId(playlistId);

    if (repeatRef.current === 2) {
      setRepeat(1);
      addRepeatRefSessionStorage(1);
      repeatRef.current = 1;
    }

    setPlaylistQueue(currentQueue => {
      if (currentQueue) {
        if (isPlaylistTrackObjectArray(currentQueue))
          if (currentQueue.length > 0) {
            indexPlaylistQueue(0, 'set');
            unShuffledQueueRef.current = currentQueue;

            if (shuffleTracksRef.current) {
              shuffleTracks({ prevQueue: [...currentQueue] });
            }

            if (!shuffleTracksRef.current) {
              playSongMutation({
                uri: currentQueue[0].track?.uri,
                options: { tempQueue: currentQueue },
              });
            }
          }
      }
      addToPlaylistQueueSessionStorage(currentQueue);
      return currentQueue;
    });
  };

  return (
    isPlayerReady && (
      <button className="rounded-full bg-black duration-300 hover:scale-105" onClick={handleClick}>
        <FontAwesomeIcon className="text-5xl" icon={faCirclePlay} color="aqua" />
      </button>
    )
  );
};

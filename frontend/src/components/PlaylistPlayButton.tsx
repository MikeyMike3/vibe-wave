import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCirclePlay } from '@awesome.me/kit-71c07605c0/icons/sharp/solid';
import { usePlaybackContext } from '../hooks/context/usePlaybackContext';
import { useQueueContext } from '../hooks/context/useQueueContext';
import { useIndexPlaylistQueue } from '../hooks/spotifyPlayer/useIndexPlaylistQueue';
import { usePlaySong } from '../hooks/spotifyPlayer/usePlaySong';
import { useShuffleTracks } from '../hooks/spotifyPlayer/useShuffleTracks';

type PlaylistPlayButtonProps = {
  playlistItems: SpotifyApi.PlaylistTrackResponse | undefined;
};

export const PlaylistPlayButton = ({ playlistItems }: PlaylistPlayButtonProps) => {
  const { setPlaylistName, shuffleTracksRef, repeatRef, setRepeat } = usePlaybackContext();
  const { setPlaylistQueue, unShuffledQueueRef } = useQueueContext();
  const shuffleTracks = useShuffleTracks();
  const playSongMutation = usePlaySong();
  const indexPlaylistQueue = useIndexPlaylistQueue();

  const handleClick = () => {
    if (!playlistItems) {
      return;
    }
    setPlaylistQueue(playlistItems.items);
    setPlaylistName('Liked Songs');

    if (repeatRef.current === 2) {
      setRepeat(1);
      repeatRef.current = 1;
    }

    setPlaylistQueue(currentQueue => {
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

      return currentQueue;
    });
  };

  return (
    <FontAwesomeIcon onClick={handleClick} className="text-6xl" icon={faCirclePlay} color="aqua" />
  );
};

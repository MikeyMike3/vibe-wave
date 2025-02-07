import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCirclePlay } from '@awesome.me/kit-71c07605c0/icons/sharp/solid';

import { usePlaybackContext } from '../hooks/context/usePlaybackContext';
import { useQueueContext } from '../hooks/context/useQueueContext';
import { useIndexPlaylistQueue } from '../hooks/spotifyPlayer/useIndexPlaylistQueue';
import { usePlaySong } from '../hooks/spotifyPlayer/usePlaySong';
import { useShuffleTracks } from '../hooks/spotifyPlayer/useShuffleTracks';
import { isPlaylistTrackObjectArray } from '../types/typeGuards/isPlaylistTrackObjectArray';
import { addToPlaylistQueueSessionStorage } from '../functions/sessionStorage/playlistQueue/addToPlaylistQueueSessionStorage';
import { addUnShuffledQueueRefSessionStorage } from '../functions/sessionStorage/playback/shuffle/addUnShuffledQueueRefSessionStorage';

type PlayLikedTracksButtonProps = {
  likedTracks: SpotifyApi.SavedTrackObject[] | undefined;
};

export const PlayLikedTracksButton = ({ likedTracks }: PlayLikedTracksButtonProps) => {
  const { setPlaylistName, shuffleTracksRef, repeatRef, setRepeat } = usePlaybackContext();
  const { setPlaylistQueue, unShuffledQueueRef } = useQueueContext();
  const shuffleTracks = useShuffleTracks();
  const playSongMutation = usePlaySong();
  const indexPlaylistQueue = useIndexPlaylistQueue();

  const handleClick = () => {
    // type assertion is not optimal here because they are 2 different types but they are extremely similar to each other
    // I didn't want to go back and modify the Queue and Playback logic if I didn't have to
    setPlaylistQueue(likedTracks as SpotifyApi.PlaylistTrackObject[]);
    setPlaylistName('Liked Songs');

    if (repeatRef.current === 2) {
      setRepeat(1);
      repeatRef.current = 1;
    }

    setPlaylistQueue(currentQueue => {
      if (currentQueue && isPlaylistTrackObjectArray(currentQueue) && currentQueue.length > 0) {
        indexPlaylistQueue(0, 'set');
        unShuffledQueueRef.current = currentQueue;
        addUnShuffledQueueRefSessionStorage(unShuffledQueueRef);
        if (shuffleTracksRef.current) {
          shuffleTracks({ prevQueue: [...currentQueue] });
          return;
        }
        if (!shuffleTracksRef.current) {
          playSongMutation({
            uri: currentQueue[0].track?.uri,
            options: { tempQueue: currentQueue },
          });
        }
      } else {
        console.error(
          'This custom hook is being used in the wrong place. Ensure that this is only being used for playing liked tracks, not playlist tracks or anything else.',
        );
      }
      addToPlaylistQueueSessionStorage(currentQueue);
      return currentQueue;
    });
  };
  return (
    <button className="rounded-full bg-black duration-300 hover:scale-105" onClick={handleClick}>
      <FontAwesomeIcon className="text-5xl" icon={faCirclePlay} color="aqua" />
    </button>
  );
};

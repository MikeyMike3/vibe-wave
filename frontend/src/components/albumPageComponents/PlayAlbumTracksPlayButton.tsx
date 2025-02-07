import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCirclePlay } from '@awesome.me/kit-71c07605c0/icons/sharp/solid';
import { usePlaybackContext } from '../../hooks/context/usePlaybackContext';
import { useQueueContext } from '../../hooks/context/useQueueContext';
import { useIndexPlaylistQueue } from '../../hooks/spotifyPlayer/useIndexPlaylistQueue';
import { usePlaySong } from '../../hooks/spotifyPlayer/usePlaySong';
import { useShuffleTracks } from '../../hooks/spotifyPlayer/useShuffleTracks';
import { isPlaylistTrackObjectArray } from '../../types/typeGuards/isPlaylistTrackObjectArray';
import { isSingleAlbumResponse } from '../../types/typeGuards/isSIngleAlbumResponse';
import { addToPlaylistQueueSessionStorage } from '../../functions/sessionStorage/playlistQueue/addToPlaylistQueueSessionStorage';
import { addUnShuffledQueueRefSessionStorage } from '../../functions/sessionStorage/playback/shuffle/addUnShuffledQueueRefSessionStorage';

type PlayAlbumTracksButtonProps = {
  album: SpotifyApi.SingleAlbumResponse | undefined;
};

export const PlayAlbumTracksPlayButton = ({ album }: PlayAlbumTracksButtonProps) => {
  const { setPlaylistName, shuffleTracksRef, repeatRef, setRepeat } = usePlaybackContext();
  const { setPlaylistQueue, unShuffledQueueRef } = useQueueContext();
  const shuffleTracks = useShuffleTracks();
  const playSongMutation = usePlaySong();
  const indexPlaylistQueue = useIndexPlaylistQueue();

  const handleClick = () => {
    setPlaylistQueue(album);
    setPlaylistName('Liked Songs');

    if (repeatRef.current === 2) {
      setRepeat(1);
      repeatRef.current = 1;
    }

    setPlaylistQueue(currentQueue => {
      if (currentQueue) {
        if (isPlaylistTrackObjectArray(currentQueue)) {
          if (currentQueue.length > 0) {
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
          }
        } else if (isSingleAlbumResponse(currentQueue)) {
          if (currentQueue.tracks.items.length > 0) {
            indexPlaylistQueue(0, 'set');
            unShuffledQueueRef.current = currentQueue;
            addUnShuffledQueueRefSessionStorage(unShuffledQueueRef);
            if (shuffleTracksRef.current) {
              shuffleTracks({ prevQueue: currentQueue });
              return;
            }
            if (!shuffleTracksRef.current) {
              playSongMutation({
                uri: currentQueue.tracks.items[0].uri,
                options: { tempQueue: currentQueue },
              });
            }
          }
        } else {
          console.error('Wrong type is specified');
        }
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

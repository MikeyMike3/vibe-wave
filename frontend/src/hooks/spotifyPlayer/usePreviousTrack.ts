import { usePlaySong } from './usePlaySong';
import { useQueueContext } from '../context/useQueueContext';
import { usePlaybackContext } from '../context/usePlaybackContext';
import { useIndexPlaylistQueue } from './useIndexPlaylistQueue';
import { useSpotifyPlayerContext } from '../context/useSpotifyPlayerContext';

export const usePreviousTrack = () => {
  const { playlistQueue, playlistQueueIndexRef } = useQueueContext();
  const { repeatRef, setRepeat, userPreviousTrackRef, playerPosition } = usePlaybackContext();
  const { player } = useSpotifyPlayerContext();
  const playSongMutation = usePlaySong();
  const indexPlaylistQueue = useIndexPlaylistQueue();
  const previousTrack = () => {
    userPreviousTrackRef.current = true;

    if (Number(playerPosition) > 5000) {
      player?.seek(0);
      return;
    }

    if (repeatRef.current === 2) {
      repeatRef.current = 1;
      setRepeat(1);
    }

    // sets the playlistQueueIndexRef to the last song of the playlist
    if (repeatRef.current === 1 && playlistQueueIndexRef.current <= 1) {
      indexPlaylistQueue(playlistQueue.length + 1, 'set');
    }

    if (playlistQueue.length > 0 && playlistQueueIndexRef.current > 1) {
      // playlistQueueIndexRef.current must be subtracted by 2 to be able to play the previous song
      indexPlaylistQueue(2, '-');
      playSongMutation({
        uri: playlistQueue[playlistQueueIndexRef.current].track?.uri,
        options: {},
      });
    }
  };

  return previousTrack;
};

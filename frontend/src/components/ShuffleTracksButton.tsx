import { useState } from 'react';
import { usePlaybackContext } from '../hooks/context/usePlaybackContext';
import { useQueueContext } from '../hooks/context/useQueueContext';
import { shuffleArray } from '../functions/shuffleArray';
import { useIndexPlaylistQueue } from '../hooks/spotifyPlayer/useIndexPlaylistQueue';

export const ShuffleTracksButton = () => {
  const { shuffleTracksRef, playerState } = usePlaybackContext();
  const { playlistQueue, setPlaylistQueue, unShuffledQueueRef } = useQueueContext();
  const indexPlaylistQueue = useIndexPlaylistQueue();
  const [shuffleTracks, setShuffleTracks] = useState(false);

  const handleClick = () => {
    if (playlistQueue.length > 0) {
      shuffleTracksRef.current = !shuffleTracksRef.current;
      setShuffleTracks(shuffle => !shuffle);
    }

    if (shuffleTracksRef.current) {
      // creates deep copies of the playlistQueue
      const toBeShuffledQueue: SpotifyApi.PlaylistTrackObject[] = JSON.parse(
        JSON.stringify(unShuffledQueueRef.current),
      );

      const shuffledQueue = shuffleArray(toBeShuffledQueue);
      indexPlaylistQueue(0, 'set');
      setPlaylistQueue(shuffledQueue);
    } else if (unShuffledQueueRef.current) {
      // Resumes the playlist from the current song when the user turns off shuffle mode.
      const currentTrack = playerState?.track_window.current_track.name;
      let index = unShuffledQueueRef.current.findIndex(item => item.track?.name === currentTrack);
      index++;
      indexPlaylistQueue(index, 'set');

      setPlaylistQueue(unShuffledQueueRef.current);
    }
  };

  return (
    <button>
      {shuffleTracks ? (
        <button onClick={handleClick}>Shuffled</button>
      ) : (
        <button onClick={handleClick}>Shuffle</button>
      )}
    </button>
  );
};

import { useState } from 'react';
import { usePlaybackContext } from '../hooks/context/usePlaybackContext';
import { useQueueContext } from '../hooks/context/useQueueContext';
import { shuffleArray } from '../functions/shuffleArray';

export const ShuffleTracksButton = () => {
  const { shuffleTracksRef, playerState } = usePlaybackContext();
  const { setPlaylistQueue, unShuffledQueueRef, playlistQueueIndexRef } = useQueueContext();
  const [shuffleTracks, setShuffleTracks] = useState(false);

  const handleClick = () => {
    shuffleTracksRef.current = !shuffleTracksRef.current;
    setShuffleTracks(shuffle => !shuffle);

    if (shuffleTracksRef.current) {
      // creates deep copies of the playlistQueue
      const toBeShuffledQueue: SpotifyApi.PlaylistTrackObject[] = JSON.parse(
        JSON.stringify(unShuffledQueueRef.current),
      );

      const shuffledQueue = shuffleArray(toBeShuffledQueue);
      playlistQueueIndexRef.current = 0;
      setPlaylistQueue(shuffledQueue);
    } else {
      const currentTrack = playerState?.track_window.current_track.name;
      // Resumes the playlist from the current song when the user turns off shuffle mode.
      if (unShuffledQueueRef.current) {
        if (playlistQueueIndexRef.current > 0) {
          let index = unShuffledQueueRef.current.findIndex(
            item => item.track?.name === currentTrack,
          );
          index++;
          playlistQueueIndexRef.current = index;
        } else {
          let index = unShuffledQueueRef.current.findIndex(
            item => item.track?.name === currentTrack,
          );
          index++;
          playlistQueueIndexRef.current = index;
        }

        setPlaylistQueue(unShuffledQueueRef.current);
      }
    }
  };

  return <button onClick={handleClick}>Shuffle</button>;
};

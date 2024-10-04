import { usePlaybackContext } from '../hooks/context/usePlaybackContext';
import { useQueueContext } from '../hooks/context/useQueueContext';
import { useIndexPlaylistQueue } from '../hooks/spotifyPlayer/useIndexPlaylistQueue';
import { usePlaySong } from '../hooks/spotifyPlayer/usePlaySong';
import { useShuffleTracks } from '../hooks/spotifyPlayer/useShuffleTracks';

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
  return <button onClick={handleClick}>PlayLikedTracksButton</button>;
};

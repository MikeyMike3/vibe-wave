import { shuffleArray } from '../../functions/shuffleArray';
import { usePlaybackContext } from '../context/usePlaybackContext';
import { useQueueContext } from '../context/useQueueContext';
import { useIndexPlaylistQueue } from './useIndexPlaylistQueue';
import { usePlaySong } from './usePlaySong';

type ShuffleTracksOptions = {
  shouldChangeState?: boolean;
  prevQueue?: SpotifyApi.PlaylistTrackObject[] | SpotifyApi.SingleAlbumResponse | undefined;
};

export const useShuffleTracks = () => {
  const { shuffleTracksRef, playerState, setShuffleTracksState } = usePlaybackContext();
  const { playlistQueue, setPlaylistQueue, unShuffledQueueRef } = useQueueContext();
  const indexPlaylistQueue = useIndexPlaylistQueue();
  const playSongMutation = usePlaySong();

  const shuffleTracks = (options: ShuffleTracksOptions = {}) => {
    const { prevQueue = [], shouldChangeState = false } = options;
    if (shouldChangeState) {
      shuffleTracksRef.current = !shuffleTracksRef.current;
      setShuffleTracksState(shuffle => !shuffle);
    }

    if (
      (shuffleTracksRef.current && prevQueue?.length > 0) ||
      (shuffleTracksRef.current && playlistQueue.length > 0)
    ) {
      // creates deep copies of the playlistQueue
      const toBeShuffledQueue: SpotifyApi.PlaylistTrackObject[] = JSON.parse(
        JSON.stringify(unShuffledQueueRef.current),
      );

      const shuffledQueue: SpotifyApi.PlaylistTrackObject[] = shuffleArray(toBeShuffledQueue);
      indexPlaylistQueue(0, 'set');
      setPlaylistQueue(shuffledQueue);
      if (prevQueue.length > 0) {
        playSongMutation({ uri: shuffledQueue[0].track?.uri, options: {} });
      }
    } else if (unShuffledQueueRef.current) {
      // Resumes the playlist from the current song when the user turns off shuffle mode.
      const currentTrack = playerState?.track_window.current_track.name;
      let index = unShuffledQueueRef.current.findIndex(item => item.track?.name === currentTrack);
      index++;
      indexPlaylistQueue(index, 'set');

      setPlaylistQueue(unShuffledQueueRef.current);
    }
  };
  return shuffleTracks;
};

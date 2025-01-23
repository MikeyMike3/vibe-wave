import { shuffleArray } from '../../functions/shuffleArray';
import { isPlaylistTrackObjectArray } from '../../types/typeGuards/isPlaylistTrackObjectArray';
import { isSingleAlbumResponse } from '../../types/typeGuards/isSIngleAlbumResponse';
import { usePlaybackContext } from '../context/usePlaybackContext';
import { useQueueContext } from '../context/useQueueContext';
import { useIndexPlaylistQueue } from './useIndexPlaylistQueue';
import { usePlaySong } from './usePlaySong';

type ShuffleTracksOptions = {
  shouldChangeState?: boolean;
  prevQueue?: SpotifyApi.PlaylistTrackObject[] | SpotifyApi.SingleAlbumResponse | undefined;
  dontPlaySong?: boolean;
};

export const useShuffleTracks = () => {
  const { shuffleTracksRef, playerState, setShuffleTracksState } = usePlaybackContext();
  const { playlistQueue, setPlaylistQueue, unShuffledQueueRef } = useQueueContext();
  const indexPlaylistQueue = useIndexPlaylistQueue();
  const playSongMutation = usePlaySong();

  const shuffleTracks = (options: ShuffleTracksOptions = {}) => {
    const { prevQueue = [], shouldChangeState = false, dontPlaySong = false } = options;
    if (shouldChangeState) {
      shuffleTracksRef.current = !shuffleTracksRef.current;
      setShuffleTracksState(shuffle => !shuffle);
    }

    if (!playlistQueue) {
      return;
    }

    if (
      (shuffleTracksRef.current && isPlaylistTrackObjectArray(prevQueue)) ||
      (shuffleTracksRef.current && isPlaylistTrackObjectArray(playlistQueue))
    ) {
      // creates deep copies of the playlistQueue
      const toBeShuffledQueue: SpotifyApi.PlaylistTrackObject[] = JSON.parse(
        JSON.stringify(unShuffledQueueRef.current),
      );

      const shuffledQueue: SpotifyApi.PlaylistTrackObject[] = shuffleArray(toBeShuffledQueue);
      indexPlaylistQueue(0, 'set');
      setPlaylistQueue(shuffledQueue);
      if (isPlaylistTrackObjectArray(prevQueue)) {
        if (prevQueue.length > 0 && !dontPlaySong) {
          playSongMutation({ uri: shuffledQueue[0].track?.uri, options: {} });
        }
      }
    } else if (
      (shuffleTracksRef.current && isSingleAlbumResponse(prevQueue)) ||
      (shuffleTracksRef.current && isSingleAlbumResponse(playlistQueue))
    ) {
      const toBeShuffledQueue: SpotifyApi.SingleAlbumResponse = JSON.parse(
        JSON.stringify(unShuffledQueueRef.current),
      );

      const shuffledTracks: SpotifyApi.TrackObjectFull[] = shuffleArray(
        toBeShuffledQueue.tracks.items,
      );

      const shuffledQueue: SpotifyApi.SingleAlbumResponse = {
        ...toBeShuffledQueue,
        tracks: {
          ...toBeShuffledQueue.tracks,
          items: shuffledTracks,
        },
      };

      indexPlaylistQueue(0, 'set');
      setPlaylistQueue(shuffledQueue);
      if (isSingleAlbumResponse(prevQueue)) {
        if (prevQueue.tracks.items.length > 0) {
          playSongMutation({ uri: shuffledQueue.tracks.items[0].uri, options: {} });
        }
      }
    } else if (unShuffledQueueRef.current) {
      if (isPlaylistTrackObjectArray(unShuffledQueueRef.current)) {
        // Resumes the playlist from the current song when the user turns off shuffle mode.
        const currentTrack = playerState?.track_window.current_track.name;
        let index = unShuffledQueueRef.current.findIndex(item => item.track?.name === currentTrack);
        index++;
        indexPlaylistQueue(index, 'set');

        setPlaylistQueue(unShuffledQueueRef.current);
      } else if (isSingleAlbumResponse(unShuffledQueueRef.current)) {
        const currentTrack = playerState?.track_window.current_track.name;
        let index = unShuffledQueueRef.current.tracks.items.findIndex(
          item => item.name === currentTrack,
        );
        index++;
        indexPlaylistQueue(index, 'set');

        setPlaylistQueue(unShuffledQueueRef.current);
      }
    }
  };
  return shuffleTracks;
};

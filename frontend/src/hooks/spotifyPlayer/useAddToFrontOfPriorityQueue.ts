import { useQueueContext } from '../context/useQueueContext';

export const useAddToFrontOfPriorityQueue = () => {
  const { setPriorityQueue } = useQueueContext();
  const addToFrontOfPriorityQueue = (
    track: SpotifyApi.TrackObjectFull | SpotifyApi.PlaylistTrackObject,
  ) => {
    if ('track' in track) {
      setPriorityQueue(prevQueue => (track.track ? [track.track, ...prevQueue] : prevQueue));
    } else {
      setPriorityQueue(prevQueue => [track, ...prevQueue]);
    }
  };
  return addToFrontOfPriorityQueue;
};

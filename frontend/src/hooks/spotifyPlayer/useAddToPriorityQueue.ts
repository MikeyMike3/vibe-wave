import { useQueueContext } from '../context/useQueueContext';

export const useAddToPriorityQueue = () => {
  const { setPriorityQueue } = useQueueContext();

  const addToPriorityQueue = (
    track: SpotifyApi.TrackObjectFull | SpotifyApi.PlaylistTrackObject,
  ) => {
    if ('track' in track) {
      setPriorityQueue(prevQueue => (track.track ? [...prevQueue, track.track] : prevQueue));
    } else {
      setPriorityQueue(prevQueue => [...prevQueue, track]);
    }
  };

  return addToPriorityQueue;
};

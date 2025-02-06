import { addToPriorityQueueSessionStorage } from '../../functions/sessionStorage/priorityQueue/addToPriorityQueueSessionStorage';
import { AlbumTrackWithImage } from '../../types/AlbumTrackWithImage';
import { useQueueContext } from '../context/useQueueContext';

export const useAddToPriorityQueue = () => {
  const { setPriorityQueue } = useQueueContext();

  const addToPriorityQueue = (
    track: SpotifyApi.TrackObjectFull | SpotifyApi.PlaylistTrackObject | AlbumTrackWithImage,
  ) => {
    setPriorityQueue(prevQueue => {
      if (prevQueue === null) {
        // If the queue is initially null, start with an array containing the new track
        if ('track' in track && track.track) {
          addToPriorityQueueSessionStorage(track);

          return [track.track as SpotifyApi.TrackObjectFull];
        } else if ('album' in track) {
          return [track as SpotifyApi.TrackObjectFull];
        } else if ('duration_ms' in track) {
          addToPriorityQueueSessionStorage(track);
          return [track as AlbumTrackWithImage];
        }
      } else {
        // If the queue is already an array, add the new track to the end of the array
        if ('track' in track && track.track) {
          console.log(prevQueue);
          return [...(prevQueue ?? []), track.track as SpotifyApi.TrackObjectFull];
        } else if ('album' in track) {
          return [...(prevQueue ?? []), track as SpotifyApi.TrackObjectFull];
        } else if ('duration_ms' in track) {
          return [...(prevQueue ?? []), track as AlbumTrackWithImage];
        }
      }

      console.warn('Unexpected track type, cannot add to queue.');
      return prevQueue;
    });
  };

  return addToPriorityQueue;
};

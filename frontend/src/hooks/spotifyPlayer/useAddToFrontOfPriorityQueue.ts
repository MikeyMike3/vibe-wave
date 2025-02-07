import { addToPriorityQueueSessionStorage } from '../../functions/sessionStorage/priorityQueue/addToPriorityQueueSessionStorage';
import { AlbumTrackWithImage } from '../../types/AlbumTrackWithImage';
import { useQueueContext } from '../context/useQueueContext';

export const useAddToFrontOfPriorityQueue = () => {
  const { setPriorityQueue } = useQueueContext();
  const addToFrontOfPriorityQueue = (
    track: SpotifyApi.TrackObjectFull | SpotifyApi.PlaylistTrackObject | AlbumTrackWithImage,
  ) => {
    setPriorityQueue(prevQueue => {
      if (prevQueue === null) {
        if ('track' in track && track.track) {
          addToPriorityQueueSessionStorage(track);
          return [track.track as SpotifyApi.TrackObjectFull];
        } else if ('album' in track) {
          addToPriorityQueueSessionStorage(track);
          return [track as SpotifyApi.TrackObjectFull];
        } else if ('duration_ms' in track) {
          addToPriorityQueueSessionStorage(track);
          return [track as AlbumTrackWithImage];
        } else {
          console.warn('Unexpected track type, cannot add to queue.');
          return prevQueue;
        }
      }

      if (Array.isArray(prevQueue)) {
        if ('track' in track && track.track) {
          addToPriorityQueueSessionStorage(track);
          return [track.track as SpotifyApi.TrackObjectFull, ...prevQueue];
        } else if ('album' in track) {
          addToPriorityQueueSessionStorage(track);
          return [track as SpotifyApi.TrackObjectFull, ...prevQueue];
        } else if ('duration_ms' in track) {
          addToPriorityQueueSessionStorage(track);
          return [track as AlbumTrackWithImage, ...prevQueue];
        } else {
          console.warn('Unexpected track type, cannot add to queue.');
          return prevQueue;
        }
      }
      console.warn('Unexpected queue state, cannot add to queue.');
      return prevQueue;
    });
  };

  return addToFrontOfPriorityQueue;
};

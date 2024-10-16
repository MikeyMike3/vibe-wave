import { AlbumTrackWithImage } from '../../types/AlbumTrackWithImage';
import { useQueueContext } from '../context/useQueueContext';

export const useAddToFrontOfPriorityQueue = () => {
  const { setPriorityQueue } = useQueueContext();
  const addToFrontOfPriorityQueue = (
    track: SpotifyApi.TrackObjectFull | SpotifyApi.PlaylistTrackObject | AlbumTrackWithImage,
  ) => {
    setPriorityQueue(prevQueue => {
      if (prevQueue === null) {
        // Handle the case where the queue is initially null
        if ('track' in track && track.track) {
          return [track.track as SpotifyApi.TrackObjectFull]; // Handle PlaylistTrackObject with a track object
        } else if ('album' in track) {
          return [track as SpotifyApi.TrackObjectFull]; // Handle TrackObjectFull
        } else if ('duration_ms' in track) {
          return [track as AlbumTrackWithImage]; // Handle AlbumTrackWithImage
        } else {
          console.warn('Unexpected track type, cannot add to queue.');
          return prevQueue;
        }
      }

      if (Array.isArray(prevQueue)) {
        // Handle the case where the queue is an array of SpotifyApi.TrackObjectFull[]
        if ('track' in track && track.track) {
          return [track.track as SpotifyApi.TrackObjectFull, ...prevQueue];
        } else if ('album' in track) {
          return [track as SpotifyApi.TrackObjectFull, ...prevQueue];
        } else if ('duration_ms' in track) {
          return [track as AlbumTrackWithImage, ...prevQueue];
        } else {
          console.warn('Unexpected track type, cannot add to queue.');
          return prevQueue;
        }
      }

      // Handle the case where the queue is AlbumTrackWithImage (if needed, you could extend this to merge with existing items)
      console.warn('Unexpected queue state, cannot add to queue.');
      return prevQueue;
    });
  };

  return addToFrontOfPriorityQueue;
};

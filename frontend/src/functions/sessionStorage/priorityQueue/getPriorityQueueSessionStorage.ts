import { AlbumTrackWithImage } from '../../../types/AlbumTrackWithImage';

export const getPriorityQueueSessionStorage = () => {
  try {
    const storedQueue = sessionStorage.getItem('priorityQueue');
    if (!storedQueue) return null;

    const parsedQueue: (
      | SpotifyApi.PlaylistTrackObject
      | SpotifyApi.TrackObjectFull
      | AlbumTrackWithImage
    )[] = JSON.parse(storedQueue);

    return parsedQueue.map(item => {
      if ('track' in item) {
        return item.track;
      }
      return item;
    });
  } catch (error) {
    console.error('Failed to retrieve priorityQueue:', error);
    return null;
  }
};

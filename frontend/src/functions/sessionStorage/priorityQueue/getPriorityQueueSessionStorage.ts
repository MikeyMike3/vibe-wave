import { AlbumTrackWithImage } from '../../../types/AlbumTrackWithImage';

export const getPriorityQueueSessionStorage = () => {
  try {
    const storedQueue = sessionStorage.getItem('priorityQueue');
    if (!storedQueue) return null;

    // Parse session storage data
    const parsedQueue: (
      | SpotifyApi.PlaylistTrackObject
      | SpotifyApi.TrackObjectFull
      | AlbumTrackWithImage
    )[] = JSON.parse(storedQueue);

    return parsedQueue.map(item => {
      // If the item is a PlaylistTrackObject, extract its track property
      if ('track' in item) {
        return item.track; // Returns TrackObjectFull from PlaylistTrackObject
      }
      return item; // Otherwise, return the original item (TrackObjectFull or AlbumTrackWithImage)
    });
  } catch (error) {
    console.error('Failed to retrieve priorityQueue:', error);
    return null;
  }
};

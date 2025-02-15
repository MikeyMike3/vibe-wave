import { AlbumTrackWithImage } from '../../../types/AlbumTrackWithImage';

export const getPriorityQueueSessionStorage = () => {
  try {
    const storedQueue = sessionStorage.getItem('priorityQueue');
    if (!storedQueue) return [];

    const parsedQueue: (
      | SpotifyApi.PlaylistTrackObject
      | SpotifyApi.TrackObjectFull
      | AlbumTrackWithImage
      | null
    )[] = JSON.parse(storedQueue) ?? [];

    if (!Array.isArray(parsedQueue)) {
      console.error('priorityQueue is not an array:', parsedQueue);
      return [];
    }

    return parsedQueue
      .map(item => (item && 'track' in item ? item.track : item)) // Extracts `track` if it exists
      .filter((item): item is SpotifyApi.TrackObjectFull | AlbumTrackWithImage => item !== null); // Removes `null` values
  } catch (error) {
    console.error('Failed to retrieve priorityQueue:', error);
    return [];
  }
};

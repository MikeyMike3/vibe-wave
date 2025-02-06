import { AlbumTrackWithImage } from '../../../types/AlbumTrackWithImage';

export const getPriorityQueueSessionStorage = () => {
  try {
    const storedQueue = sessionStorage.getItem('priorityQueue');
    if (!storedQueue) return null;

    const parsedQueue: (
      | SpotifyApi.PlaylistTrackObject
      | SpotifyApi.TrackObjectFull
      | AlbumTrackWithImage
      | null
    )[] = JSON.parse(storedQueue);

    return parsedQueue
      .map(item => (item && 'track' in item ? item.track : item)) // Extracts `track` if it exists
      .filter((item): item is SpotifyApi.TrackObjectFull | AlbumTrackWithImage => item !== null); // Removes `null` values
  } catch (error) {
    console.error('Failed to retrieve priorityQueue:', error);
    return null;
  }
};

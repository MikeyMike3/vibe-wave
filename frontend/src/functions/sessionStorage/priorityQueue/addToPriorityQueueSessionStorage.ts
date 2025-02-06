import { AlbumTrackWithImage } from '../../../types/AlbumTrackWithImage';

export const addToPriorityQueueSessionStorage = (
  track: SpotifyApi.PlaylistTrackObject | SpotifyApi.TrackObjectFull | AlbumTrackWithImage,
) => {
  try {
    const storedQueue = sessionStorage.getItem('priorityQueue');

    const queue: (
      | SpotifyApi.PlaylistTrackObject
      | SpotifyApi.TrackObjectFull
      | AlbumTrackWithImage
    )[] = storedQueue ? JSON.parse(storedQueue) : [];
    queue.push(track);

    sessionStorage.setItem('priorityQueue', JSON.stringify(queue));
  } catch (error) {
    console.error('Failed to update priorityQueue:', error);
  }
};

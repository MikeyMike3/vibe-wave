import { AlbumTrackWithImage } from '../../../types/AlbumTrackWithImage';

export const removeFirstFromPriorityQueueSessionData = () => {
  try {
    const storedQueue = sessionStorage.getItem('priorityQueue');
    if (!storedQueue) return;

    const queue: (SpotifyApi.TrackObjectFull | AlbumTrackWithImage)[] = JSON.parse(storedQueue);

    if (queue.length === 0) return;

    queue.shift();

    sessionStorage.setItem('priorityQueue', JSON.stringify(queue));
  } catch (error) {
    console.error('Failed to remove first item from priorityQueue:', error);
  }
};

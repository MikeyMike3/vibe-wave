import { AlbumTrackWithImage } from '../../../types/AlbumTrackWithImage';

// this sets the entire priorityQueue to whatever the argument is
export const setPriorityQueueSessionStorage = (
  priorityQueue: (SpotifyApi.TrackObjectFull | AlbumTrackWithImage)[],
) => {
  sessionStorage.setItem(
    'priorityQueue',
    priorityQueue.length > 0 ? JSON.stringify(priorityQueue) : 'null',
  );
};

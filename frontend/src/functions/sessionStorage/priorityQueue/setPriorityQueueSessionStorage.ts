import { AlbumTrackWithImage } from '../../../types/AlbumTrackWithImage';

// this sets the entire priorityQueue to whatever the argument is
export const setPriorityQueueSessionStorage = (
  priorityQueue: (SpotifyApi.TrackObjectFull | AlbumTrackWithImage)[] | undefined,
) => {
  sessionStorage.setItem(
    'priorityQueue',
    priorityQueue && priorityQueue?.length > 0 ? JSON.stringify(priorityQueue) : 'null',
  );
};

import { addToPlaylistQueueSessionStorage } from '../../functions/sessionStorage/playlistQueue/addToPlaylistQueueSessionStorage';
import { useQueueContext } from '../../hooks/context/useQueueContext';
import { isPlaylistTrackObjectArray } from '../../types/typeGuards/isPlaylistTrackObjectArray';
import { isSingleAlbumResponse } from '../../types/typeGuards/isSIngleAlbumResponse';

type Options = {
  shouldIndexPlaylistQueue?: boolean;
  shouldIndexPriorityQueue?: boolean;
};

export const useRemoveFromQueue = () => {
  const { setPlaylistQueue, playlistQueue, priorityQueue, setPriorityQueue } = useQueueContext();
  const removeFromQueue = (name: string | undefined, options: Options = {}) => {
    const { shouldIndexPlaylistQueue = false, shouldIndexPriorityQueue = false } = options;

    if (!shouldIndexPlaylistQueue && !shouldIndexPriorityQueue) {
      console.error('No options were selected. You must select an option.');
      return;
    }

    if (shouldIndexPriorityQueue && priorityQueue) {
      const indexToRemove = priorityQueue.findIndex(item => item.name === name);
      setPriorityQueue(prevQueue => {
        const tempQueue = prevQueue?.filter((_, index) => index !== indexToRemove);
        return tempQueue;
      });
    } else if (shouldIndexPlaylistQueue && playlistQueue) {
      let indexToRemove: number;

      if (isPlaylistTrackObjectArray(playlistQueue)) {
        indexToRemove = playlistQueue.findIndex(item => item.track?.name === name);
        setPlaylistQueue(prevQueue => {
          if (!prevQueue) {
            return;
          }
          if (isPlaylistTrackObjectArray(prevQueue)) {
            const tempQueue = prevQueue?.filter((_, index) => index !== indexToRemove);
            addToPlaylistQueueSessionStorage(tempQueue);
            return tempQueue;
          }
        });
      } else if (isSingleAlbumResponse(playlistQueue)) {
        let indexToRemove: number;

        if (isSingleAlbumResponse(playlistQueue)) {
          indexToRemove = playlistQueue.tracks.items.findIndex(item => item.name === name);
          setPlaylistQueue(prevQueue => {
            if (!prevQueue) {
              return;
            }
            if (isSingleAlbumResponse(prevQueue)) {
              const updatedTracks = {
                ...prevQueue.tracks,
                items: prevQueue.tracks.items.filter((_, index) => index !== indexToRemove),
              };
              return {
                ...prevQueue,
                tracks: updatedTracks,
              };
            }
          });
        }
      }
    }
  };
  return removeFromQueue;
};

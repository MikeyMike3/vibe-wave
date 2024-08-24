import { useEffect } from 'react';
import { addToPriorityQueue } from '../apis/spotifyPlayer/addToPriorityQueue';
import { useQueueContext } from '../hooks/context/useQueueContext';

type AddToQueueButtonProps = {
  track: SpotifyApi.TrackObjectFull;
};

export const AddToQueueButton = ({ track }: AddToQueueButtonProps) => {
  const { setPriorityQueue, priorityQueue } = useQueueContext();

  useEffect(() => {
    console.log(priorityQueue);
  }, [priorityQueue]);

  return <button onClick={() => addToPriorityQueue(setPriorityQueue, track)}>Add to Queue</button>;
};

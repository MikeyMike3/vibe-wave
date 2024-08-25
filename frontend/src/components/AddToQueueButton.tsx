import { addToPriorityQueue } from '../functions/spotifyPlayer/addToPriorityQueue';
import { useQueueContext } from '../hooks/context/useQueueContext';

type AddToQueueButtonProps = {
  track: SpotifyApi.TrackObjectFull;
};

export const AddToQueueButton = ({ track }: AddToQueueButtonProps) => {
  const { setPriorityQueue } = useQueueContext();

  return <button onClick={() => addToPriorityQueue(setPriorityQueue, track)}>Add to Queue</button>;
};

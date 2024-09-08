import { useQueueContext } from '../hooks/context/useQueueContext';

type AddToFrontOfQueueProps = {
  track: SpotifyApi.TrackObjectFull;
};

export const AddToFrontOfQueue = ({ track }: AddToFrontOfQueueProps) => {
  const { setPriorityQueue } = useQueueContext();
  const handleClick = () => {
    setPriorityQueue(prevQueue => {
      const newQueue = [track, ...prevQueue];
      return newQueue;
    });
  };
  return <button onClick={handleClick}>AddToFrontOfQueue</button>;
};

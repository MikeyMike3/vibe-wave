import { useRemoveFromQueue } from '../../hooks/spotifyPlayer/useRemoveFromQueue';

type RemoveFromQueueButtonProps = {
  name: string | undefined;
};

export const RemoveFromQueueButton = ({ name }: RemoveFromQueueButtonProps) => {
  const removeFromQueue = useRemoveFromQueue();

  return <button onClick={() => removeFromQueue(name)}>RemoveFromQueue</button>;
};

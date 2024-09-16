import { useRemoveFromQueue } from '../../hooks/spotifyPlayer/useRemoveFromQueue';

type RemoveFromQueueButtonProps = {
  name: string | undefined;
  priorityQueue: boolean | undefined;
};

export const RemoveFromQueueButton = ({ name, priorityQueue }: RemoveFromQueueButtonProps) => {
  const removeFromQueue = useRemoveFromQueue();

  return (
    <button
      className="hover:text-textHover text-textPrimary duration-150"
      onClick={() => removeFromQueue(name, priorityQueue)}
    >
      RemoveFromQueue
    </button>
  );
};

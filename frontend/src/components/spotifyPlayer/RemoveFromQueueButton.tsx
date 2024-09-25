import { useRemoveFromQueue } from '../../hooks/spotifyPlayer/useRemoveFromQueue';

type RemoveFromQueueButtonProps = {
  name: string | undefined;
  priorityQueue: boolean | undefined;
  // prettier-ignore
  setIsKebabMenuClicked: React.Dispatch<React.SetStateAction<boolean>>
};

export const RemoveFromQueueButton = ({
  name,
  priorityQueue,
  setIsKebabMenuClicked,
}: RemoveFromQueueButtonProps) => {
  const removeFromQueue = useRemoveFromQueue();

  return (
    <button
      className="text-textPrimary duration-150 hover:text-textHover"
      onClick={() => {
        setIsKebabMenuClicked(false);
        removeFromQueue(name, priorityQueue);
      }}
    >
      RemoveFromQueue
    </button>
  );
};

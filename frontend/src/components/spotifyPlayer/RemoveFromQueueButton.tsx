import { useRemoveFromQueue } from '../../hooks/spotifyPlayer/useRemoveFromQueue';

type RemoveFromQueueButtonProps = {
  name: string | undefined;
  shouldIndexPriorityQueue?: boolean | undefined;
  shouldIndexPlaylistQueue?: boolean | undefined;

  // prettier-ignore
  setIsKebabMenuClicked: React.Dispatch<React.SetStateAction<boolean>>
};

export const RemoveFromQueueButton = ({
  name,
  shouldIndexPriorityQueue,
  shouldIndexPlaylistQueue,

  setIsKebabMenuClicked,
}: RemoveFromQueueButtonProps) => {
  const removeFromQueue = useRemoveFromQueue();

  return (
    <button
      className="text-textPrimary duration-150 hover:text-textHover"
      onClick={() => {
        setIsKebabMenuClicked(false);
        if (shouldIndexPriorityQueue) {
          removeFromQueue(name, { shouldIndexPriorityQueue: true });
        } else if (shouldIndexPlaylistQueue) {
          removeFromQueue(name, { shouldIndexPlaylistQueue: true });
        }
      }}
    >
      RemoveFromQueue
    </button>
  );
};

import { useRemoveFromQueue } from '../../hooks/spotifyPlayer/useRemoveFromQueue';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@awesome.me/kit-71c07605c0/icons/sharp/regular';

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
  if (!shouldIndexPlaylistQueue && !shouldIndexPriorityQueue) {
    console.error(
      'No options were selected. Set either shouldIndexPriorityQueue or shouldIndexPlaylistQueue to true',
    );
    return;
  }

  return (
    <button
      className="w-full text-left text-textPrimary duration-150 hover:text-aqua"
      onClick={() => {
        setIsKebabMenuClicked(false);
        if (shouldIndexPriorityQueue) {
          removeFromQueue(name, { shouldIndexPriorityQueue: true });
        } else if (shouldIndexPlaylistQueue) {
          removeFromQueue(name, { shouldIndexPlaylistQueue: true });
        }
      }}
    >
      <div className="flex items-center gap-2">
        <FontAwesomeIcon icon={faTrash} className="text-xl" />
        Remove From Queue
      </div>
    </button>
  );
};

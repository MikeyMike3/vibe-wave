import { addToPriorityQueueSessionStorage } from '../functions/sessionStorage/priorityQueue/addToPriorityQueueSessionStorage';
import { useAddToPriorityQueue } from '../hooks/spotifyPlayer/useAddToPriorityQueue';
import { AlbumTrackWithImage } from '../types/AlbumTrackWithImage';
import { faPlus } from '@awesome.me/kit-71c07605c0/icons/sharp/regular';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

type AddToQueueButtonProps = {
  track: SpotifyApi.TrackObjectFull | SpotifyApi.PlaylistTrackObject | AlbumTrackWithImage;
  // prettier-ignore
  setIsKebabMenuClicked: React.Dispatch<React.SetStateAction<boolean>>
};

export const AddToQueueButton = ({ track, setIsKebabMenuClicked }: AddToQueueButtonProps) => {
  const addToPriorityQueue = useAddToPriorityQueue();

  return (
    <button
      className="w-full text-left text-textPrimary duration-150 hover:text-aqua"
      onClick={() => {
        setIsKebabMenuClicked(false);
        addToPriorityQueue(track);
        addToPriorityQueueSessionStorage(track);
      }}
    >
      <div className="flex items-center gap-2">
        <FontAwesomeIcon icon={faPlus} className="text-xl" />
        Add to Queue
      </div>
    </button>
  );
};

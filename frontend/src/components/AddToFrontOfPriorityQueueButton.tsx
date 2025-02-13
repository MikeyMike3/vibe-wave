import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBringForward } from '@awesome.me/kit-71c07605c0/icons/sharp/regular';
import { useAddToFrontOfPriorityQueue } from '../hooks/spotifyPlayer/useAddToFrontOfPriorityQueue';
import { AlbumTrackWithImage } from '../types/AlbumTrackWithImage';

type AddToFrontOfQueueProps = {
  track: SpotifyApi.TrackObjectFull | SpotifyApi.PlaylistTrackObject | AlbumTrackWithImage;
  // prettier-ignore
  setIsKebabMenuClicked: React.Dispatch<React.SetStateAction<boolean>>
};

export const AddToFrontOfPriorityQueueButton = ({
  track,
  setIsKebabMenuClicked,
}: AddToFrontOfQueueProps) => {
  const addToFrontOfPriorityQueue = useAddToFrontOfPriorityQueue();

  return (
    <button
      className="w-full text-left text-textPrimary duration-150 hover:text-aqua"
      onClick={() => {
        setIsKebabMenuClicked(false);
        addToFrontOfPriorityQueue(track);
      }}
    >
      <div className="flex items-center gap-2">
        <FontAwesomeIcon icon={faBringForward} className="text-xl" />
        Add To Front Of Queue
      </div>
    </button>
  );
};

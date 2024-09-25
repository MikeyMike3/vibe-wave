import { useAddToFrontOfPriorityQueue } from '../hooks/spotifyPlayer/useAddToFrontOfPriorityQueue';

type AddToFrontOfQueueProps = {
  track: SpotifyApi.TrackObjectFull | SpotifyApi.PlaylistTrackObject;
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
      className="text-textPrimary duration-150 hover:text-textHover"
      onClick={() => {
        setIsKebabMenuClicked(false);
        addToFrontOfPriorityQueue(track);
      }}
    >
      AddToFrontOfQueue
    </button>
  );
};

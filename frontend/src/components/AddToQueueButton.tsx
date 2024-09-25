import { useAddToPriorityQueue } from '../hooks/spotifyPlayer/useAddToPriorityQueue';

type AddToQueueButtonProps = {
  track: SpotifyApi.TrackObjectFull | SpotifyApi.PlaylistTrackObject;
  // prettier-ignore
  setIsKebabMenuClicked: React.Dispatch<React.SetStateAction<boolean>>
};

export const AddToQueueButton = ({ track, setIsKebabMenuClicked }: AddToQueueButtonProps) => {
  const addToPriorityQueue = useAddToPriorityQueue();

  return (
    <button
      className="text-textPrimary duration-150 hover:text-textHover"
      onClick={() => {
        setIsKebabMenuClicked(false);
        addToPriorityQueue(track);
      }}
    >
      Add to Queue
    </button>
  );
};

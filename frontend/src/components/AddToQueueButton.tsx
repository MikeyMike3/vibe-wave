import { useAddToPriorityQueue } from '../hooks/spotifyPlayer/useAddToPriorityQueue';

type AddToQueueButtonProps = {
  track: SpotifyApi.TrackObjectFull | SpotifyApi.PlaylistTrackObject;
};

export const AddToQueueButton = ({ track }: AddToQueueButtonProps) => {
  const addToPriorityQueue = useAddToPriorityQueue();

  return (
    <button
      className="hover:text-textHover text-textPrimary duration-150"
      onClick={() => addToPriorityQueue(track)}
    >
      Add to Queue
    </button>
  );
};

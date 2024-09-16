import { useAddToFrontOfPriorityQueue } from '../hooks/spotifyPlayer/useAddToFrontOfPriorityQueue';

type AddToFrontOfQueueProps = {
  track: SpotifyApi.TrackObjectFull | SpotifyApi.PlaylistTrackObject;
};

export const AddToFrontOfPriorityQueueButton = ({ track }: AddToFrontOfQueueProps) => {
  const addToFrontOfPriorityQueue = useAddToFrontOfPriorityQueue();

  return (
    <button
      className="hover:text-textHover text-textPrimary duration-150"
      onClick={() => addToFrontOfPriorityQueue(track)}
    >
      AddToFrontOfQueue
    </button>
  );
};

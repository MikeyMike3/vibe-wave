import { useAddToPriorityQueue } from '../hooks/spotifyPlayer/useAddToPriorityQueue';

type AddToQueueButtonProps = {
  track: SpotifyApi.TrackObjectFull | SpotifyApi.PlaylistTrackObject;
};

export const AddToQueueButton = ({ track }: AddToQueueButtonProps) => {
  const addToPriorityQueue = useAddToPriorityQueue();

  return <button onClick={() => addToPriorityQueue(track)}>Add to Queue</button>;
};

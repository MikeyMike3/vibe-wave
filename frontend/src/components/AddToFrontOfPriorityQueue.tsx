import { useAddToFrontOfPriorityQueue } from '../hooks/spotifyPlayer/useAddToFrontOfPriorityQueue';

type AddToFrontOfQueueProps = {
  track: SpotifyApi.TrackObjectFull | SpotifyApi.PlaylistTrackObject;
};

export const AddToFrontOfPriorityQueue = ({ track }: AddToFrontOfQueueProps) => {
  const addToFrontOfPriorityQueue = useAddToFrontOfPriorityQueue();

  return <button onClick={() => addToFrontOfPriorityQueue(track)}>AddToFrontOfQueue</button>;
};

import { usePreviousTrack } from '../../hooks/spotifyPlayer/usePreviousTrack';

export const PreviousTrackButton = () => {
  const previousTrack = usePreviousTrack();

  return <button onClick={previousTrack}>Previous</button>;
};

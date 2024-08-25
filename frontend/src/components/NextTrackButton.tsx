import { useNextTrack } from '../hooks/spotifyPlayer/useNextTrack';

export const NextTrackButton = () => {
  const nextTrack = useNextTrack();
  return <button onClick={nextTrack}>Next</button>;
};

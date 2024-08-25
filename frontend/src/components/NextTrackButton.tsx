import { useNextTrack } from '../hooks/apis/useNextTrack';

export const NextTrackButton = () => {
  const nextTrack = useNextTrack();
  return <button onClick={nextTrack}>Next</button>;
};

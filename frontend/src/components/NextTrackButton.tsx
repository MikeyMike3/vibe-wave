import { useNextTrack } from '../apis/hooks/useNextTrack';

export const NextTrackButton = () => {
  const nextTrack = useNextTrack();
  return <button onClick={nextTrack}>Next</button>;
};

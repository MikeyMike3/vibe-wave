import { usePlaySkip } from '../../hooks/spotifyPlayer/usePlaySkip';

type PlaySkipButtonProps = {
  name: string;
};

export const PlaySkipButton = ({ name }: PlaySkipButtonProps) => {
  const playSkip = usePlaySkip();
  return <button onClick={() => playSkip(name)}>PlaySkip</button>;
};

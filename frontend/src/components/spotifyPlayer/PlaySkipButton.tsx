import { usePlaySkip } from '../../hooks/spotifyPlayer/usePlaySkip';

type PlaySkipButtonProps = {
  name: string | undefined;
};

export const PlaySkipButton = ({ name }: PlaySkipButtonProps) => {
  const playSkip = usePlaySkip();
  return <button onClick={() => playSkip(name)}>PlaySkip</button>;
};

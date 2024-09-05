import { usePlaySkip } from '../../hooks/spotifyPlayer/usePlaySkip';

type PlaySkipButtonProps = {
  name: string | undefined;
  priorityQueue: boolean | undefined;
};

export const PlaySkipButton = ({ name, priorityQueue }: PlaySkipButtonProps) => {
  const playSkip = usePlaySkip();
  return <button onClick={() => playSkip(name, priorityQueue)}>PlaySkip</button>;
};

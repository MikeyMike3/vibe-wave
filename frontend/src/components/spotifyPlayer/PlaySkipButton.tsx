import { usePlaySkip } from '../../hooks/spotifyPlayer/usePlaySkip';

type PlaySkipButtonProps = {
  name: string | undefined;
  priorityQueue: boolean | undefined;
  // prettier-ignore
  setIsKebabMenuClicked: React.Dispatch<React.SetStateAction<boolean>>
};

export const PlaySkipButton = ({
  name,
  priorityQueue,
  setIsKebabMenuClicked,
}: PlaySkipButtonProps) => {
  const playSkip = usePlaySkip();
  return (
    <button
      className="text-textPrimary duration-150 hover:text-textHover"
      onClick={() => {
        setIsKebabMenuClicked(false);
        playSkip(name, priorityQueue);
      }}
    >
      PlaySkip
    </button>
  );
};

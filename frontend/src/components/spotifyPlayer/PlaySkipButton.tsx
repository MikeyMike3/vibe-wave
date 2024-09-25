import { usePlaySkip } from '../../hooks/spotifyPlayer/usePlaySkip';

type PlaySkipButtonProps = {
  name: string | undefined;
  shouldIndexPriorityQueue?: boolean | undefined;
  shouldIndexPlaylistQueue?: boolean | undefined;
  shouldPlaySong?: boolean | undefined;
  track?: SpotifyApi.TrackObjectFull | SpotifyApi.PlaylistTrackObject;
  // prettier-ignore
  setIsKebabMenuClicked: React.Dispatch<React.SetStateAction<boolean>>
};

export const PlaySkipButton = ({
  name,
  shouldIndexPriorityQueue,
  shouldIndexPlaylistQueue,
  shouldPlaySong,
  track,
  setIsKebabMenuClicked,
}: PlaySkipButtonProps) => {
  const playSkip = usePlaySkip();
  return (
    <button
      className="text-textPrimary duration-150 hover:text-textHover"
      onClick={() => {
        setIsKebabMenuClicked(false);
        if (shouldIndexPriorityQueue) {
          playSkip(name, { shouldIndexPriorityQueue: true });
        } else if (shouldIndexPlaylistQueue) {
          playSkip(name, { shouldIndexPlaylistQueue: true });
        } else if (shouldPlaySong) {
          playSkip(name, { shouldPlaySong: true }, track);
        }
      }}
    >
      PlaySkip
    </button>
  );
};

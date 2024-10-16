import { usePlaySkip } from '../../hooks/spotifyPlayer/usePlaySkip';
import { AlbumTrackWithImage } from '../../types/AlbumTrackWithImage';

type PlaySkipButtonProps = {
  name: string | undefined;
  shouldIndexPriorityQueue?: boolean | undefined;
  shouldIndexPlaylistQueue?: boolean | undefined;
  shouldPlaySong?: boolean | undefined;
  track?: SpotifyApi.TrackObjectFull | SpotifyApi.PlaylistTrackObject | AlbumTrackWithImage;
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
  if (!shouldIndexPlaylistQueue && !shouldIndexPriorityQueue && !shouldPlaySong) {
    console.error(
      'No options were selected. Set one of shouldIndexPriorityQueue, shouldIndexPlaylistQueue, or shouldPlaySong to true',
    );
    return;
  }

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

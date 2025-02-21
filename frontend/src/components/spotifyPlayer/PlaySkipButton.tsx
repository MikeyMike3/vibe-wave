import { usePlaySkip } from '../../hooks/spotifyPlayer/usePlaySkip';
import { AlbumTrackWithImage } from '../../types/AlbumTrackWithImage';
import { faCirclePlay } from '@awesome.me/kit-71c07605c0/icons/sharp/regular';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

type PlaySkipButtonProps = {
  name: string | undefined;
  shouldIndexPriorityQueue?: boolean | undefined;
  shouldIndexPlaylistQueue?: boolean | undefined;
  shouldPlaySong?: boolean | undefined;
  track?: SpotifyApi.TrackObjectFull | SpotifyApi.PlaylistTrackObject | AlbumTrackWithImage;
  // prettier-ignore
  setIsKebabMenuClicked: React.Dispatch<React.SetStateAction<boolean>>
  setTempKebabState?: React.Dispatch<React.SetStateAction<boolean>>;
};

export const PlaySkipButton = ({
  name,
  shouldIndexPriorityQueue,
  shouldIndexPlaylistQueue,
  shouldPlaySong,
  track,
  setIsKebabMenuClicked,
  setTempKebabState,
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
      className="w-full text-left text-textPrimary duration-150 hover:text-aqua"
      onClick={() => {
        setIsKebabMenuClicked(false);
        if (setTempKebabState) {
          setTempKebabState(false);
        }

        if (shouldIndexPriorityQueue) {
          playSkip(name, { shouldIndexPriorityQueue: true });
        } else if (shouldIndexPlaylistQueue) {
          playSkip(name, { shouldIndexPlaylistQueue: true });
        } else if (shouldPlaySong) {
          playSkip(name, { shouldPlaySong: true }, track);
        }
      }}
    >
      <div className="flex items-center gap-2">
        <FontAwesomeIcon icon={faCirclePlay} className="text-xl" />
        Play Song
      </div>
    </button>
  );
};

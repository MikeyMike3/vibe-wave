import { useEffect, useRef, useState } from 'react';
import { faEllipsisVertical as faEllipsisVerticalSolid } from '@awesome.me/kit-71c07605c0/icons/sharp/solid';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { AddToFrontOfPriorityQueueButton } from '../AddToFrontOfPriorityQueueButton';
import { AddToQueueButton } from '../AddToQueueButton';
import { PlaySkipButton } from '../spotifyPlayer/PlaySkipButton';

type SearchedTrackKebabMenuProps = {
  track: SpotifyApi.TrackObjectFull;
};

export const SearchedTrackKebabMenu = ({ track }: SearchedTrackKebabMenuProps) => {
  const [isKebabMenuClicked, setIsKebabMenuClicked] = useState<boolean>(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Detect clicks outside of the menu
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsKebabMenuClicked(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [menuRef]);
  return (
    <div className="relative" ref={menuRef}>
      <button onClick={() => setIsKebabMenuClicked(!isKebabMenuClicked)}>
        <FontAwesomeIcon
          className="rounded-full p-2 px-4 text-xl text-textPrimary duration-150 hover:bg-bgAccentHover"
          icon={faEllipsisVerticalSolid}
        />
      </button>

      <div
        className={`${isKebabMenuClicked ? 'block' : 'hidden'} absolute bottom-0 right-11 flex flex-col gap-4 rounded-xl bg-bgPrimary p-4`}
      >
        <PlaySkipButton
          name={track.name}
          shouldPlaySong={true}
          setIsKebabMenuClicked={setIsKebabMenuClicked}
          track={track}
        />
        <div className="h-[2px] w-full bg-bgAccent" />

        <AddToQueueButton track={track} setIsKebabMenuClicked={setIsKebabMenuClicked} />
        <div className="h-[2px] w-full bg-bgAccent" />

        <AddToFrontOfPriorityQueueButton
          track={track}
          setIsKebabMenuClicked={setIsKebabMenuClicked}
        />
      </div>
    </div>
  );
};

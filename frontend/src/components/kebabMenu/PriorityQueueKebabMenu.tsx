import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisVertical as faEllipsisVerticalSolid } from '@awesome.me/kit-71c07605c0/icons/sharp/solid';
import { useEffect, useRef, useState } from 'react';

import { PlaySkipButton } from '../spotifyPlayer/PlaySkipButton';
import { RemoveFromQueueButton } from '../spotifyPlayer/RemoveFromQueueButton';

type PriorityQueueKebabMenuProps = {
  track: SpotifyApi.TrackObjectFull | SpotifyApi.PlaylistTrackObject;
};

export const PriorityQueueKebabMenu = ({ track }: PriorityQueueKebabMenuProps) => {
  const [isKebabMenuClicked, setIsKebabMenuClicked] = useState<boolean>(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Detect clicks outside of the menu
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsKebabMenuClicked(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [menuRef]);
  return (
    <div className="relative" ref={menuRef}>
      <button onClick={() => setIsKebabMenuClicked(!isKebabMenuClicked)}>
        <FontAwesomeIcon
          className="rounded-full p-2 px-4 text-xl text-textPrimary duration-150 hover:bg-bgAccent"
          icon={faEllipsisVerticalSolid}
        />
      </button>

      <div
        className={`${isKebabMenuClicked ? 'block' : 'hidden'} absolute bottom-0 right-11 flex flex-col gap-4 rounded-xl bg-bgPrimary p-4`}
      >
        {track && 'uri' in track ? (
          <>
            <PlaySkipButton
              name={track.name}
              shouldIndexPriorityQueue={true}
              setIsKebabMenuClicked={setIsKebabMenuClicked}
            />
          </>
        ) : (
          <PlaySkipButton
            name={track.track?.name}
            shouldIndexPriorityQueue={true}
            setIsKebabMenuClicked={setIsKebabMenuClicked}
          />
        )}

        <div className="h-[2px] w-full bg-bgAccent" />
        {track && 'uri' in track ? (
          <RemoveFromQueueButton
            name={track.name}
            shouldIndexPriorityQueue={true}
            setIsKebabMenuClicked={setIsKebabMenuClicked}
          />
        ) : (
          <RemoveFromQueueButton
            name={track.track?.name}
            shouldIndexPriorityQueue={true}
            setIsKebabMenuClicked={setIsKebabMenuClicked}
          />
        )}
      </div>
    </div>
  );
};

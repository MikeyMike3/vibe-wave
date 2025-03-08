import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisVertical as faEllipsisVerticalSolid } from '@awesome.me/kit-71c07605c0/icons/sharp/solid';
import { useEffect, useRef, useState } from 'react';

import { PlaySkipButton } from '../spotifyPlayer/PlaySkipButton';
import { RemoveFromQueueButton } from '../spotifyPlayer/RemoveFromQueueButton';
import { AlbumTrackWithImage } from '../../types/AlbumTrackWithImage';
import { OpenInSpotifyButton } from '../OpenInSpotifyButton';

type PriorityQueueKebabMenuProps = {
  track: SpotifyApi.TrackObjectFull | SpotifyApi.PlaylistTrackObject | AlbumTrackWithImage;
  //prettier-ignore
  queueDisplayRef: React.RefObject<HTMLDivElement>;
};

export const PriorityQueueKebabMenu = ({ track, queueDisplayRef }: PriorityQueueKebabMenuProps) => {
  const [isKebabMenuClicked, setIsKebabMenuClicked] = useState<boolean>(false);
  const [tempKebabState, setTempKebabState] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const [menuStyle, setMenuStyle] = useState<React.CSSProperties>({});
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Detect clicks outside of the menu
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsKebabMenuClicked(false);
        setTempKebabState(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [menuRef]);

  useEffect(() => {
    if (tempKebabState && menuRef.current && dropdownRef.current && queueDisplayRef.current) {
      const menuRect = menuRef.current.getBoundingClientRect(); // Get kebab button position
      const dropdownHeight = dropdownRef.current.offsetHeight; // Get dropdown height
      const queueDisplayRect = queueDisplayRef.current.getBoundingClientRect(); // Get scrollable queueDisplay dimensions

      // Calculate available space below the kebab button within the scrollable queueDisplay
      const spaceAbove = menuRect.top - queueDisplayRect.top;
      const spaceBelow = queueDisplayRect.bottom - menuRect.bottom; // Space below the kebab button within the queueDisplay

      let newStyle: React.CSSProperties = {};

      // Check if there's enough space below for the dropdown within the queueDisplay
      if (spaceBelow < dropdownHeight && spaceAbove < dropdownHeight) {
        // If neither space above nor below is enough, set a fallback (e.g., within the container with scrolling)
        newStyle = {
          top: `-70px`, // Constrained positioning
          bottom: 'auto',
        };
      } else if (spaceBelow < dropdownHeight) {
        // If not enough space below, position the dropdown above the button
        newStyle = {
          top: 'auto',
          bottom: `${queueDisplayRect.bottom / menuRect.top}px`, // Align it to the top of the button, accounting for scroll
        };
      } else {
        // If enough space, position the dropdown below the button within the queueDisplay
        newStyle = {
          top: `0px`, // Position relative to the queueDisplay's top
          bottom: 'auto',
        };
      }
      setIsKebabMenuClicked(true);
      setMenuStyle(newStyle);
    }
  }, [tempKebabState, isKebabMenuClicked, queueDisplayRef]);

  const handleClick = () => {
    setTempKebabState(!tempKebabState);
    if (tempKebabState) {
      setIsKebabMenuClicked(false);
    }
  };
  return (
    <div className="relative" ref={menuRef}>
      <button onClick={handleClick}>
        <FontAwesomeIcon
          className="rounded-full p-2 px-4 text-xl text-textPrimary duration-150 hover:bg-bgAccentHover lg:group-hover:text-aqua"
          icon={faEllipsisVerticalSolid}
        />
      </button>

      <div
        style={menuStyle}
        ref={dropdownRef}
        className={`${isKebabMenuClicked ? 'block' : 'hidden'} ' absolute right-11 flex w-[230px] flex-col gap-4 rounded-xl bg-bgPrimary p-4`}
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
          <>
            <RemoveFromQueueButton
              name={track.name}
              shouldIndexPriorityQueue={true}
              setIsKebabMenuClicked={setIsKebabMenuClicked}
            />
            <div className="h-[2px] w-full bg-bgAccent" />
            <OpenInSpotifyButton spotifyUrl={track.external_urls.spotify} />
          </>
        ) : (
          <>
            <RemoveFromQueueButton
              name={track.track?.name}
              shouldIndexPriorityQueue={true}
              setIsKebabMenuClicked={setIsKebabMenuClicked}
            />
            <div className="h-[2px] w-full bg-bgAccent" />
            <OpenInSpotifyButton spotifyUrl={track.track?.external_urls.spotify} />
          </>
        )}
      </div>
    </div>
  );
};

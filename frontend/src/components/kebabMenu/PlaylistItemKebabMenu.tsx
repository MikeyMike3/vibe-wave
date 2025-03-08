import { useEffect, useRef, useState } from 'react';
import { faEllipsisVertical as faEllipsisVerticalSolid } from '@awesome.me/kit-71c07605c0/icons/sharp/solid';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { AddToFrontOfPriorityQueueButton } from '../AddToFrontOfPriorityQueueButton';
import { AddToQueueButton } from '../AddToQueueButton';
import { PlaySkipButton } from '../spotifyPlayer/PlaySkipButton';
import { OpenInSpotifyButton } from '../OpenInSpotifyButton';
import { useMainDisplayRefContext } from '../../hooks/context/useMainDisplayRefContext';

type PlaylistItemKebabMenuProps = {
  track: SpotifyApi.PlaylistTrackObject;
};

export const PlaylistItemKebabMenu = ({ track }: PlaylistItemKebabMenuProps) => {
  const { mainDisplayRef } = useMainDisplayRefContext();

  const [isKebabMenuClicked, setIsKebabMenuClicked] = useState<boolean>(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const [menuStyle, setMenuStyle] = useState<React.CSSProperties>({});
  const [tempKebabState, setTempKebabState] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

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
    if (tempKebabState && menuRef.current && dropdownRef.current && mainDisplayRef.current) {
      const menuRect = menuRef.current.getBoundingClientRect();
      const dropdownHeight = dropdownRef.current.offsetHeight;
      const queueDisplayRect = mainDisplayRef.current.getBoundingClientRect();

      // Calculate available space below the kebab button within the scrollable queueDisplay
      const spaceAbove = menuRect.top - queueDisplayRect.top;
      const spaceBelow = queueDisplayRect.bottom - menuRect.bottom;

      let newStyle: React.CSSProperties = {};

      // Check if there's enough space below for the dropdown within the queueDisplay
      if (spaceBelow < dropdownHeight && spaceAbove < dropdownHeight) {
        // If neither space above nor below is enough, set a fallback (e.g., within the container with scrolling)
        newStyle = {
          top: `-70px`,
          bottom: 'auto',
        };
      } else if (spaceBelow < dropdownHeight) {
        // If not enough space below, position the dropdown above the button
        newStyle = {
          top: 'auto',
          bottom: `${queueDisplayRect.bottom / menuRect.top}px`,
        };
      } else {
        // If enough space, position the dropdown below the button within the queueDisplay
        newStyle = {
          top: `0px`,
          bottom: 'auto',
        };
      }
      setIsKebabMenuClicked(true);
      setMenuStyle(newStyle);
    }
  }, [tempKebabState, isKebabMenuClicked, mainDisplayRef]);

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
          className="rounded-full p-2 px-4 text-xl text-textAccent duration-150 hover:bg-bgAccentHover lg:group-hover:text-aqua"
          icon={faEllipsisVerticalSolid}
        />
      </button>

      <div
        ref={dropdownRef}
        style={menuStyle}
        className={`${isKebabMenuClicked ? 'block' : 'hidden'} absolute bottom-0 right-11 flex w-[230px] flex-col gap-4 rounded-xl bg-bgPrimary p-4`}
      >
        <PlaySkipButton
          name={track.track?.name}
          shouldPlaySong={true}
          setIsKebabMenuClicked={setIsKebabMenuClicked}
          setTempKebabState={setTempKebabState}
          track={track}
        />
        <div className="h-[2px] w-full bg-bgAccent" />

        <AddToQueueButton
          track={track}
          setIsKebabMenuClicked={setIsKebabMenuClicked}
          setTempKebabState={setTempKebabState}
        />
        <div className="h-[2px] w-full bg-bgAccent" />

        <AddToFrontOfPriorityQueueButton
          track={track}
          setIsKebabMenuClicked={setIsKebabMenuClicked}
          setTempKebabState={setTempKebabState}
        />
        <div className="h-[2px] w-full bg-bgAccent" />

        <OpenInSpotifyButton spotifyUrl={track.track?.external_urls.spotify} />
      </div>
    </div>
  );
};

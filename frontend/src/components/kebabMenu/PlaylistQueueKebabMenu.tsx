import { useEffect, useRef, useState } from 'react';
import { faEllipsisVertical as faEllipsisVerticalSolid } from '@awesome.me/kit-71c07605c0/icons/sharp/solid';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { PlaySkipButton } from '../spotifyPlayer/PlaySkipButton';
import { AddToQueueButton } from '../AddToQueueButton';
import { AddToFrontOfPriorityQueueButton } from '../AddToFrontOfPriorityQueueButton';
import { RemoveFromQueueButton } from '../spotifyPlayer/RemoveFromQueueButton';
import { OpenInSpotifyButton } from '../OpenInSpotifyButton';
import { AlbumTrackWithImage } from '../../types/AlbumTrackWithImage';

type PlaylistQueueKebabMenuProps = {
  track: SpotifyApi.PlaylistTrackObject | AlbumTrackWithImage;
  //prettier-ignore
  queueDisplayRef: React.RefObject<HTMLDivElement>;
};

const isPlaylistTrack = (
  track: SpotifyApi.PlaylistTrackObject | AlbumTrackWithImage,
): track is SpotifyApi.PlaylistTrackObject =>
  !!track &&
  typeof track === 'object' &&
  'track' in track &&
  track.track !== null &&
  typeof track.track === 'object' &&
  'name' in track.track;

const isAlbumTrackWithImage = (
  track: SpotifyApi.PlaylistTrackObject | AlbumTrackWithImage,
): track is AlbumTrackWithImage =>
  !!track &&
  typeof track === 'object' &&
  'name' in track &&
  'images' in track &&
  Array.isArray(track.images) &&
  'albumId' in track;

export const PlaylistQueueKebabMenu = ({ track, queueDisplayRef }: PlaylistQueueKebabMenuProps) => {
  const [isKebabMenuClicked, setIsKebabMenuClicked] = useState<boolean>(false);
  const [menuStyle, setMenuStyle] = useState<React.CSSProperties>({});
  const [tempKebabState, setTempKebabState] = useState(false);
  const menuRef = useRef<HTMLButtonElement>(null);
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
    <div className="relative">
      <button ref={menuRef} onClick={handleClick}>
        <FontAwesomeIcon
          className="rounded-full p-2 px-4 text-xl text-textPrimary duration-150 hover:bg-bgAccentHover lg:group-hover:text-aqua"
          icon={faEllipsisVerticalSolid}
        />
      </button>

      <div
        ref={dropdownRef}
        style={menuStyle}
        className={`${isKebabMenuClicked ? 'block' : 'hidden'} ' absolute right-11 flex w-[230px] flex-col gap-4 rounded-xl bg-bgPrimary p-4`}
      >
        <PlaySkipButton
          name={
            isPlaylistTrack(track) && track.track
              ? track.track.name
              : isAlbumTrackWithImage(track)
                ? track.name
                : undefined
          }
          shouldPlaySong={true}
          shouldIndexPlaylistQueue={true}
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
        <div className="h-[2px] w-full bg-bgAccent" />
        <RemoveFromQueueButton
          name={
            isPlaylistTrack(track) && track.track
              ? track.track.name
              : isAlbumTrackWithImage(track)
                ? track.name
                : undefined
          }
          shouldIndexPlaylistQueue={true}
          setIsKebabMenuClicked={setIsKebabMenuClicked}
        />

        <div className="h-[2px] w-full bg-bgAccent" />
        <OpenInSpotifyButton
          spotifyUrl={
            isPlaylistTrack(track) && track.track
              ? track.track.external_urls?.spotify
              : isAlbumTrackWithImage(track)
                ? track.external_urls?.spotify
                : undefined
          }
        />
      </div>
    </div>
  );
};

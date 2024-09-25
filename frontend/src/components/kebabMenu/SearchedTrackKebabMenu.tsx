import { useState } from 'react';
import { faEllipsisVertical as faEllipsisVerticalSolid } from '@awesome.me/kit-71c07605c0/icons/sharp/solid';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { AddToFrontOfPriorityQueueButton } from '../AddToFrontOfPriorityQueueButton';
import { AddToQueueButton } from '../AddToQueueButton';
import { PlaySkipButton } from '../spotifyPlayer/PlaySkipButton';

type SearchedTrackKebabMenuProps = {
  track: SpotifyApi.TrackObjectFull | SpotifyApi.PlaylistTrackObject | undefined;
  name: string;
};

export const SearchedTrackKebabMenu = ({ track, name }: SearchedTrackKebabMenuProps) => {
  const [isKebabMenuClicked, setIsKebabMenuClicked] = useState<boolean>(false);
  return (
    <>
      <button onClick={() => setIsKebabMenuClicked(!isKebabMenuClicked)}>
        <FontAwesomeIcon
          className="rounded-full p-2 px-4 text-xl text-textPrimary duration-150 hover:bg-bgAccent"
          icon={faEllipsisVerticalSolid}
        />
      </button>

      <div
        className={`${isKebabMenuClicked ? 'block' : 'hidden'} absolute bottom-0 right-11 flex flex-col gap-4 rounded-xl bg-bgPrimary p-4`}
      >
        <PlaySkipButton name={name} priorityQueue={true} />
        <div className="h-[2px] w-full bg-bgAccent" />

        {track && (
          <>
            <AddToQueueButton track={track} />
            <div className="h-[2px] w-full bg-bgAccent" />

            <AddToFrontOfPriorityQueueButton track={track} />
          </>
        )}
      </div>
    </>
  );
};

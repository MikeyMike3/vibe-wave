import { faEllipsisVertical as faEllipsisVerticalSolid } from '@awesome.me/kit-71c07605c0/icons/sharp/solid';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';
import { AddToFrontOfPriorityQueueButton } from './AddToFrontOfPriorityQueueButton';
import { AddToQueueButton } from './AddToQueueButton';
import { PlaySkipButton } from './spotifyPlayer/PlaySkipButton';
import { RemoveFromQueueButton } from './spotifyPlayer/RemoveFromQueueButton';

type KebabMenuProps = {
  track: SpotifyApi.TrackObjectFull | SpotifyApi.PlaylistTrackObject | undefined;
  name: string | undefined;
  priorityQueue: boolean | undefined;
  shouldIncludeRemoveQueueButton?: boolean | undefined;
};

export const KebabMenu = ({
  track,
  name,
  priorityQueue,
  shouldIncludeRemoveQueueButton,
}: KebabMenuProps) => {
  const [isKebabMenuClicked, setIsKebabMenuClicked] = useState<boolean>(false);

  return (
    <div className="relative">
      <button onClick={() => setIsKebabMenuClicked(!isKebabMenuClicked)}>
        <FontAwesomeIcon className="text-xl" icon={faEllipsisVerticalSolid} />
      </button>
      <div
        className={`${isKebabMenuClicked ? 'block' : 'hidden'} absolute bottom-0 right-4 flex flex-col gap-4 rounded-xl bg-bgPrimary p-4`}
      >
        <PlaySkipButton name={name} priorityQueue={priorityQueue} />
        <div className="h-[2px] w-full bg-bgAccent" />
        {shouldIncludeRemoveQueueButton && (
          <>
            <RemoveFromQueueButton name={name} priorityQueue={priorityQueue} />
            <div className="h-[2px] w-full bg-bgAccent" />
          </>
        )}
        {track && 'track' in track && <AddToQueueButton track={track} />}
        <div className="h-[2px] w-full bg-bgAccent" />
        {track && 'track' in track && <AddToFrontOfPriorityQueueButton track={track} />}
      </div>
    </div>
  );
};

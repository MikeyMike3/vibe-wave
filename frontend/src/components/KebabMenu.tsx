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
    <div>
      <button onClick={() => setIsKebabMenuClicked(!isKebabMenuClicked)}>
        <FontAwesomeIcon icon={faEllipsisVerticalSolid} />
      </button>
      <div className={`${isKebabMenuClicked ? 'block' : 'hidden'} `}>
        <PlaySkipButton name={name} priorityQueue={priorityQueue} />
        {shouldIncludeRemoveQueueButton && (
          <RemoveFromQueueButton name={name} priorityQueue={priorityQueue} />
        )}

        {track && 'track' in track && <AddToQueueButton track={track} />}
        {track && 'track' in track && <AddToFrontOfPriorityQueueButton track={track} />}
      </div>
    </div>
  );
};

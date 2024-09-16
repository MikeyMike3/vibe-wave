import { faEllipsisVertical as faEllipsisVerticalSolid } from '@awesome.me/kit-71c07605c0/icons/sharp/solid';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';
import { useAddToPriorityQueue } from '../hooks/spotifyPlayer/useAddToPriorityQueue';
import { useAddToFrontOfPriorityQueue } from '../hooks/spotifyPlayer/useAddToFrontOfPriorityQueue';
import { useRemoveFromQueue } from '../hooks/spotifyPlayer/useRemoveFromQueue';
import { usePlaySkip } from '../hooks/spotifyPlayer/usePlaySkip';

type KebabMenuProps = {
  track: SpotifyApi.TrackObjectFull | SpotifyApi.PlaylistTrackObject;
  name: string | undefined;
};

export const KebabMenu = ({ track, name }: KebabMenuProps) => {
  const addToPriorityQueue = useAddToPriorityQueue();
  const addToFrontOfPriorityQueue = useAddToFrontOfPriorityQueue();
  const removeFromQueue = useRemoveFromQueue();
  const playSkip = usePlaySkip();

  const [isKebabMenuClicked, setIsKebabMenuClicked] = useState<boolean>(false);

  return (
    <div>
      <button onClick={() => setIsKebabMenuClicked(!isKebabMenuClicked)}>
        <FontAwesomeIcon icon={faEllipsisVerticalSolid} />
      </button>
      <div className={`${isKebabMenuClicked && 'block'} hidden`}>
        <button onClick={() => playSkip(name, false)}>PlaySkip</button>
        <button onClick={() => removeFromQueue(name, false)}>RemoveFromQueue</button>
        <button onClick={() => addToPriorityQueue(track)}>AddToQueue</button>
        <button onClick={() => addToFrontOfPriorityQueue(track)}>AddToFrontOfQueue</button>
      </div>
    </div>
  );
};

import { useState } from 'react';
import { faEllipsisVertical as faEllipsisVerticalSolid } from '@awesome.me/kit-71c07605c0/icons/sharp/solid';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { PlaySkipButton } from '../spotifyPlayer/PlaySkipButton';
import { AddToQueueButton } from '../AddToQueueButton';
import { AddToFrontOfPriorityQueueButton } from '../AddToFrontOfPriorityQueueButton';
import { RemoveFromQueueButton } from '../spotifyPlayer/RemoveFromQueueButton';

type PlaylistQueueKebabMenuProps = {
  track: SpotifyApi.PlaylistTrackObject;
};

export const PlaylistQueueKebabMenu = ({ track }: PlaylistQueueKebabMenuProps) => {
  const [isKebabMenuClicked, setIsKebabMenuClicked] = useState<boolean>(false);

  return (
    <div className="relative">
      <button onClick={() => setIsKebabMenuClicked(!isKebabMenuClicked)}>
        <FontAwesomeIcon
          className="rounded-full p-2 px-4 text-xl text-textPrimary duration-150 hover:bg-bgAccent"
          icon={faEllipsisVerticalSolid}
        />
      </button>

      <div
        className={`${isKebabMenuClicked ? 'block' : 'hidden'} absolute bottom-0 right-11 flex flex-col gap-4 rounded-xl bg-bgPrimary p-4`}
      >
        <PlaySkipButton
          name={track.track?.name}
          shouldIndexPlaylistQueue={true}
          setIsKebabMenuClicked={setIsKebabMenuClicked}
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
          name={track.track?.name}
          priorityQueue={false}
          setIsKebabMenuClicked={setIsKebabMenuClicked}
        />
      </div>
    </div>
  );
};

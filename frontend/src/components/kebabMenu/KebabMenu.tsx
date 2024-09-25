import { faEllipsisVertical as faEllipsisVerticalSolid } from '@awesome.me/kit-71c07605c0/icons/sharp/solid';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';
import { AddToFrontOfPriorityQueueButton } from '../AddToFrontOfPriorityQueueButton';
import { AddToQueueButton } from '../AddToQueueButton';
import { PlaySkipButton } from '../spotifyPlayer/PlaySkipButton';
import { RemoveFromQueueButton } from '../spotifyPlayer/RemoveFromQueueButton';

type KebabMenuProps = {
  track: SpotifyApi.TrackObjectFull | SpotifyApi.PlaylistTrackObject | undefined;
  name?: string | undefined;
  priorityQueue?: boolean | undefined;
  shouldIncludeRemoveQueueButton?: boolean | undefined;
  shouldIncludeAddToQueueButton?: boolean | undefined;
  shouldIncludeAddToFrontOfPriorityQueueButton?: boolean | undefined;
};

export const KebabMenu = ({
  track,
  name,
  priorityQueue,
  shouldIncludeRemoveQueueButton,
  shouldIncludeAddToQueueButton,
  shouldIncludeAddToFrontOfPriorityQueueButton,
}: KebabMenuProps) => {
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
          name={name}
          priorityQueue={priorityQueue}
          setIsKebabMenuClicked={setIsKebabMenuClicked}
        />
        <div className="h-[2px] w-full bg-bgAccent" />
        {shouldIncludeRemoveQueueButton && (
          <>
            <RemoveFromQueueButton name={name} priorityQueue={priorityQueue} />
            <div className="h-[2px] w-full bg-bgAccent" />
          </>
        )}

        {shouldIncludeAddToQueueButton && (
          <>
            {track && 'track' in track ? (
              <>
                <AddToQueueButton track={track} setIsKebabMenuClicked={setIsKebabMenuClicked} />
                <div className="h-[2px] w-full bg-bgAccent" />
              </>
            ) : (
              <>
                {track && (
                  <>
                    <AddToQueueButton track={track} setIsKebabMenuClicked={setIsKebabMenuClicked} />
                    <div className="h-[2px] w-full bg-bgAccent" />
                  </>
                )}
              </>
            )}
          </>
        )}

        {shouldIncludeAddToFrontOfPriorityQueueButton && (
          <>
            {track && 'track' in track ? (
              <>
                <AddToFrontOfPriorityQueueButton
                  track={track}
                  setIsKebabMenuClicked={setIsKebabMenuClicked}
                />
                <div className="h-[2px] w-full bg-bgAccent" />
              </>
            ) : (
              <>
                {track && (
                  <>
                    <AddToFrontOfPriorityQueueButton
                      track={track}
                      setIsKebabMenuClicked={setIsKebabMenuClicked}
                    />
                    <div className="h-[2px] w-full bg-bgAccent" />
                  </>
                )}
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
};

import { useEffect, useState } from 'react';
import { useQueueContext } from '../../hooks/context/useQueueContext';
import { QueueDisplay } from './QueueDisplay';
import { usePlaybackContext } from '../../hooks/context/usePlaybackContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faListMusic } from '@fortawesome/pro-solid-svg-icons';

export const Queue = () => {
  const { playlistQueue, playlistQueueIndex } = useQueueContext();
  const { repeatRef, repeat } = usePlaybackContext();
  const [queueSegment, setQueueSegment] = useState<SpotifyApi.PlaylistTrackObject[]>([]);

  const [isQueueSegmentOpen, setIsQueueSegmentOpen] = useState<boolean>(false);

  useEffect(() => {
    const temp = playlistQueue?.slice(playlistQueueIndex, playlistQueueIndex + 50);
    if (temp.length < 50 && repeatRef.current === 1) {
      const sliceAmount = 50 - temp.length;
      const tempSliceSegment = playlistQueue?.slice(0, sliceAmount);
      const combinedArray = [...temp, ...tempSliceSegment];
      setQueueSegment(combinedArray);
    } else {
      setQueueSegment(temp);
    }
  }, [playlistQueueIndex, playlistQueue, repeatRef, repeat]);

  const handleClick = () => {
    setIsQueueSegmentOpen(prev => !prev);
  };

  return (
    <>
      <button
        className={
          isQueueSegmentOpen ? `text-aqua` : `text-textAccent duration-150 hover:text-textPrimary`
        }
        onClick={handleClick}
      >
        <FontAwesomeIcon className="text-2xl" icon={faListMusic} />
      </button>
      {isQueueSegmentOpen && <QueueDisplay queueSegment={queueSegment} />}
    </>
  );
};

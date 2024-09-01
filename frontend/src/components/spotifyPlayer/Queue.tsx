import { useEffect, useState } from 'react';
import { useQueueContext } from '../../hooks/context/useQueueContext';
import { QueueDisplay } from './QueueDisplay';

export const Queue = () => {
  const { playlistQueue, playlistQueueIndex } = useQueueContext();
  const [queueSegment, setQueueSegment] = useState<SpotifyApi.PlaylistTrackObject[]>([]);
  const [isQueueSegmentOpen, setIsQueueSegmentOpen] = useState<boolean>(false);

  useEffect(() => {
    const temp = playlistQueue?.slice(playlistQueueIndex, playlistQueueIndex + 50);
    setQueueSegment(temp);
  }, [playlistQueueIndex, playlistQueue]);

  const handleClick = () => {
    setIsQueueSegmentOpen(prev => !prev);
  };

  return (
    <>
      <button onClick={handleClick}>Queue</button>
      {isQueueSegmentOpen && <QueueDisplay queueSegment={queueSegment} />}
    </>
  );
};

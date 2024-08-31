import { useEffect, useState } from 'react';
import { useQueueContext } from '../../hooks/context/useQueueContext';

export const Queue = () => {
  const { playlistQueue, playlistQueueIndex } = useQueueContext();

  const [queueSegment, setQueueSegment] = useState<SpotifyApi.PlaylistTrackObject[]>([]);

  useEffect(() => {
    const temp = playlistQueue.slice(playlistQueueIndex, playlistQueueIndex + 50);
    setQueueSegment(temp);
  }, [playlistQueueIndex, playlistQueue]);

  useEffect(() => {
    console.log(queueSegment);
  }, [queueSegment]);

  return <>{queueSegment.map(item => item.track?.name)}</>;
};

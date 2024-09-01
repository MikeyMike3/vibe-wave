import { useEffect, useState } from 'react';
import { useQueueContext } from '../../hooks/context/useQueueContext';
import { QueueItem } from './QueueItem';
import { usePlaybackContext } from '../../hooks/context/usePlaybackContext';

export const Queue = () => {
  const { priorityQueue, playlistQueue, playlistQueueIndex } = useQueueContext();
  const { playerState, playlistName } = usePlaybackContext();

  const [queueSegment, setQueueSegment] = useState<SpotifyApi.PlaylistTrackObject[]>([]);
  const [isQueueSegmentOpen, setIsQueueSegmentOpen] = useState(false);

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
      {isQueueSegmentOpen && (
        <div className="absolute bottom-28 right-4 h-[400px] w-[500px] overflow-y-scroll bg-black px-2">
          {playerState?.track_window.current_track && (
            <>
              <h2 className="py-2 text-xl"> Currently Playing</h2>
              <QueueItem
                key={playerState.track_window.current_track.id}
                name={playerState.track_window.current_track.name}
                images={playerState.track_window.current_track.album.images}
                artists={playerState.track_window.current_track.artists}
              />
            </>
          )}

          {priorityQueue?.length > 0 && (
            <>
              <h2 className="py-2 text-xl">Next in Queue</h2>
              {priorityQueue.map(item => (
                <QueueItem
                  key={item.id}
                  name={item.name}
                  images={item.album.images}
                  artists={item.artists}
                />
              ))}
            </>
          )}
          <h2 className="py-2 text-xl">Next Up from {playlistName}</h2>
          {queueSegment.map(item => (
            <QueueItem
              key={item.track?.id}
              name={item.track?.name}
              images={item.track?.album.images}
              artists={item.track?.artists}
            />
          ))}
        </div>
      )}
    </>
  );
};

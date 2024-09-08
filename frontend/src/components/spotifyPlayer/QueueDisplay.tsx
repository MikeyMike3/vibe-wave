import { useQueueContext } from '../../hooks/context/useQueueContext';
import { QueueItem } from './QueueItem';
import { usePlaybackContext } from '../../hooks/context/usePlaybackContext';

type QueueDisplayProps = {
  queueSegment: SpotifyApi.PlaylistTrackObject[];
};

export const QueueDisplay = ({ queueSegment }: QueueDisplayProps) => {
  const { priorityQueue, playlistQueue } = useQueueContext();
  const { playerState, playlistName } = usePlaybackContext();

  return (
    <div className="absolute bottom-28 right-4 h-[400px] w-[500px] overflow-y-scroll bg-black px-2">
      {playerState?.track_window.current_track && (
        <>
          <h2 className="py-2 text-xl"> Currently Playing</h2>
          <QueueItem
            key={playerState.track_window.current_track.id}
            name={playerState.track_window.current_track.name}
            images={playerState.track_window.current_track.album.images}
            artists={playerState.track_window.current_track.artists}
            currentlyPlaying={true}
          />
        </>
      )}

      {priorityQueue && priorityQueue?.length > 0 && (
        <>
          <h2 className="py-2 text-xl">Next in Queue</h2>
          {priorityQueue.map((item, index) => (
            <QueueItem
              key={`${item.id}-${index}`}
              name={item.name}
              images={item.album.images}
              artists={item.artists}
              track={item}
              priorityQueue={true}
            />
          ))}
        </>
      )}
      {playlistQueue.length > 0 && (
        <>
          <h2 className="py-2 text-xl">Next Up from {playlistName}</h2>
          {queueSegment.map((item, index) => (
            <QueueItem
              key={`${item.track?.id}-${index}`}
              name={item.track?.name}
              images={item.track?.album.images}
              artists={item.track?.artists}
              track={item}
            />
          ))}
        </>
      )}
    </div>
  );
};

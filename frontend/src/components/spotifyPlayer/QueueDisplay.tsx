import { useQueueContext } from '../../hooks/context/useQueueContext';
import { QueueItem } from './QueueItem';
import { usePlaybackContext } from '../../hooks/context/usePlaybackContext';
import { useRef } from 'react';

type QueueDisplayProps = {
  queueSegment: SpotifyApi.PlaylistTrackObject[];
  //prettier-ignore
  setIsQueueSegmentOpen: React.Dispatch<React.SetStateAction<boolean>>
};

export const QueueDisplay = ({ queueSegment, setIsQueueSegmentOpen }: QueueDisplayProps) => {
  const { priorityQueue, playlistQueue } = useQueueContext();
  const { playerState, playlistName } = usePlaybackContext();

  const queueDisplayRef = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={queueDisplayRef}
      className="absolute bottom-[105px] right-4 h-[400px] w-[500px] overflow-y-scroll border-2 border-bgAccentHover bg-black px-2"
    >
      {playerState?.track_window.current_track && (
        <>
          <div className="flex items-center justify-between">
            <h2 className="py-2 text-xl text-textPrimary"> Currently Playing</h2>
            <button className="p-2 text-xl" onClick={() => setIsQueueSegmentOpen(false)}>
              Close
            </button>
          </div>
          <QueueItem
            key={playerState.track_window.current_track.id}
            queueDisplayRef={queueDisplayRef}
            name={playerState.track_window.current_track.name}
            images={playerState.track_window.current_track.album.images}
            artists={playerState.track_window.current_track.artists}
            currentlyPlaying={true}
          />
        </>
      )}

      {priorityQueue && priorityQueue?.length > 0 && (
        <>
          <h2 className="py-2 text-xl text-textPrimary">Next in Queue</h2>
          {priorityQueue.map((item, index) => (
            <QueueItem
              key={`${item.id}-${index}`}
              queueDisplayRef={queueDisplayRef}
              isPriorityQueueItem={true}
              name={item.name}
              images={item.album.images}
              artists={item.artists}
              track={item}
            />
          ))}
        </>
      )}
      {playlistQueue.length > 0 && (
        <>
          <h2 className="py-2 text-xl text-textPrimary">Next Up from: {playlistName}</h2>
          {queueSegment.map((item, index) => (
            <QueueItem
              key={`${item.track?.id}-${index}`}
              queueDisplayRef={queueDisplayRef}
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

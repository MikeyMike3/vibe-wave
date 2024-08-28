import { createContext, ReactNode, useRef, useState } from 'react';

type QueueProviderProps = {
  children: ReactNode;
};

type QueueContext = {
  priorityQueue: SpotifyApi.TrackObjectFull[];
  //prettier-ignore
  setPriorityQueue: React.Dispatch<React.SetStateAction<SpotifyApi.TrackObjectFull[]>>;
  playlistQueue: SpotifyApi.PlaylistTrackObject[];
  //prettier-ignore
  setPlaylistQueue: React.Dispatch<React.SetStateAction<SpotifyApi.PlaylistTrackObject[]>>;
  //prettier-ignore
  playlistQueueIndexRef: React.MutableRefObject<number>;
  //prettier-ignore
  unShuffledQueueRef: React.MutableRefObject<SpotifyApi.PlaylistTrackObject[] | undefined>;
};

const QueueContext = createContext<QueueContext | undefined>(undefined);

export const QueueProvider = ({ children }: QueueProviderProps) => {
  const [priorityQueue, setPriorityQueue] = useState<SpotifyApi.TrackObjectFull[]>([]);
  const [playlistQueue, setPlaylistQueue] = useState<SpotifyApi.PlaylistTrackObject[]>([]);

  const playlistQueueIndexRef = useRef(0);
  const unShuffledQueueRef = useRef<SpotifyApi.PlaylistTrackObject[]>();

  return (
    <QueueContext.Provider
      value={{
        priorityQueue,
        setPriorityQueue,
        setPlaylistQueue,
        playlistQueue,
        playlistQueueIndexRef,
        unShuffledQueueRef,
      }}
    >
      {children}
    </QueueContext.Provider>
  );
};
export { QueueContext };

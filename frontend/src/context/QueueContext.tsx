import { createContext, ReactNode, useRef, useState } from 'react';
import { AlbumTrackWithImage } from '../types/AlbumTrackWithImage';

type QueueProviderProps = {
  children: ReactNode;
};

type QueueContext = {
  priorityQueue: (SpotifyApi.TrackObjectFull | AlbumTrackWithImage)[] | null;
  //prettier-ignore
  setPriorityQueue: React.Dispatch<React.SetStateAction<(SpotifyApi.TrackObjectFull | AlbumTrackWithImage)[] | null>>;

  playlistQueue: SpotifyApi.PlaylistTrackObject[];
  //prettier-ignore
  setPlaylistQueue: React.Dispatch<React.SetStateAction<SpotifyApi.PlaylistTrackObject[]>>;
  playlistQueueIndex: number;
  //prettier-ignore
  setPlaylistQueueIndex: React.Dispatch<React.SetStateAction<number>>
  //prettier-ignore
  playlistQueueIndexRef: React.MutableRefObject<number>;
  //prettier-ignore
  unShuffledQueueRef: React.MutableRefObject<SpotifyApi.PlaylistTrackObject[] | undefined>;
};

const QueueContext = createContext<QueueContext | undefined>(undefined);

export const QueueProvider = ({ children }: QueueProviderProps) => {
  const [priorityQueue, setPriorityQueue] = useState<
    (SpotifyApi.TrackObjectFull | AlbumTrackWithImage)[] | null
  >(null);
  const [playlistQueue, setPlaylistQueue] = useState<SpotifyApi.PlaylistTrackObject[]>([]);
  const [playlistQueueIndex, setPlaylistQueueIndex] = useState<number>(0);

  const playlistQueueIndexRef = useRef(0);
  const unShuffledQueueRef = useRef<SpotifyApi.PlaylistTrackObject[]>();

  return (
    <QueueContext.Provider
      value={{
        priorityQueue,
        setPriorityQueue,
        setPlaylistQueue,
        playlistQueue,
        playlistQueueIndex,
        setPlaylistQueueIndex,
        playlistQueueIndexRef,
        unShuffledQueueRef,
      }}
    >
      {children}
    </QueueContext.Provider>
  );
};
export { QueueContext };

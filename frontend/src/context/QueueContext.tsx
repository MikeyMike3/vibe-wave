import { createContext, ReactNode, useState } from 'react';

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
};

const QueueContext = createContext<QueueContext | undefined>(undefined);

export const QueueProvider = ({ children }: QueueProviderProps) => {
  const [priorityQueue, setPriorityQueue] = useState<SpotifyApi.TrackObjectFull[]>([]);
  const [playlistQueue, setPlaylistQueue] = useState<SpotifyApi.TrackObjectFull[]>([]);

  return (
    <QueueContext.Provider
      value={{ priorityQueue, setPriorityQueue, setPlaylistQueue, playlistQueue }}
    >
      {children}
    </QueueContext.Provider>
  );
};
export { QueueContext };

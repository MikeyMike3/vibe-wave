import { createContext, ReactNode, useRef, useState } from 'react';
import { AlbumTrackWithImage } from '../types/AlbumTrackWithImage';
import { getPriorityQueueSessionStorage } from '../functions/sessionStorage/priorityQueue/getPriorityQueueSessionStorage';
import { getPlaylistQueueSessionStorage } from '../functions/sessionStorage/playlistQueue/getPlaylistQueueSessionStorage';
import { getPlaylistQueueIndexRefFromSessionStorage } from '../functions/sessionStorage/playlistQueue/getPlaylistQueueIndexRefToSessionStorage';
import { getUnShuffledQueueRefSessionStorage } from '../functions/sessionStorage/playback/shuffle/getUnShuffledQueueRefSessionStorage';

type QueueProviderProps = {
  children: ReactNode;
};

type QueueContext = {
  priorityQueue: (SpotifyApi.TrackObjectFull | AlbumTrackWithImage)[] | null | undefined;
  setPriorityQueue: React.Dispatch<
    React.SetStateAction<(SpotifyApi.TrackObjectFull | AlbumTrackWithImage)[] | null | undefined>
  >;

  playlistQueue: SpotifyApi.PlaylistTrackObject[] | SpotifyApi.SingleAlbumResponse | undefined;
  setPlaylistQueue: React.Dispatch<
    React.SetStateAction<
      SpotifyApi.PlaylistTrackObject[] | SpotifyApi.SingleAlbumResponse | undefined
    >
  >;
  playlistQueueIndex: number;
  setPlaylistQueueIndex: React.Dispatch<React.SetStateAction<number>>;
  playlistQueueIndexRef: React.MutableRefObject<number>;
  unShuffledQueueRef: React.MutableRefObject<
    SpotifyApi.PlaylistTrackObject[] | SpotifyApi.SingleAlbumResponse | undefined
  >;
};

const QueueContext = createContext<QueueContext | undefined>(undefined);

export const QueueProvider = ({ children }: QueueProviderProps) => {
  const [priorityQueue, setPriorityQueue] = useState<
    (SpotifyApi.TrackObjectFull | AlbumTrackWithImage)[] | null | undefined
  >(getPriorityQueueSessionStorage());

  const [playlistQueue, setPlaylistQueue] = useState<
    SpotifyApi.PlaylistTrackObject[] | SpotifyApi.SingleAlbumResponse | undefined
  >(getPlaylistQueueSessionStorage() || []);
  const [playlistQueueIndex, setPlaylistQueueIndex] = useState<number>(
    getPlaylistQueueIndexRefFromSessionStorage() || 0,
  );

  const playlistQueueIndexRef = useRef(getPlaylistQueueIndexRefFromSessionStorage() || 0);
  const unShuffledQueueRef = useRef<
    SpotifyApi.PlaylistTrackObject[] | SpotifyApi.SingleAlbumResponse | undefined
  >(getUnShuffledQueueRefSessionStorage());
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

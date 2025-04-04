import { createContext, ReactNode, useEffect, useRef, useState } from 'react';
import { getShuffleTracksRefSessionStorage } from '../functions/sessionStorage/playback/shuffle/getShuffleTracksRefSessionStorage';
import { getRepeatRefSessionStorage } from '../functions/sessionStorage/playback/repeat/getRepeatRefSessionStorage';
import { addPlaylistIdSessionStorage } from '../functions/sessionStorage/playback/playlist/playlistId/addPlaylistIdSessionStorage';
import { addPlaylistNameSessionStorage } from '../functions/sessionStorage/playback/playlist/playlistName/addPlaylistNameSessionStorage';
import { getPlaylistNameSessionStorage } from '../functions/sessionStorage/playback/playlist/playlistName/getPlaylistNameSessionStorage';
import { getPlaylistIdSessionStorage } from '../functions/sessionStorage/playback/playlist/playlistId/getPlaylistIdSessionStorage';

type PlaybackProvider = {
  children: ReactNode;
};

type PlaybackContext = {
  repeat: number;
  // prettier-ignore
  setRepeat: React.Dispatch<React.SetStateAction<number>>
  // prettier-ignore
  repeatRef: React.MutableRefObject<number>
  // prettier-ignore
  userSkippedTrackRef: React.MutableRefObject<boolean>;
  // prettier-ignore
  userPreviousTrackRef: React.MutableRefObject<boolean>;
  // prettier-ignore
  shuffleTracksRef: React.MutableRefObject<boolean>;
  //prettier-ignore
  isPausedRef:  React.MutableRefObject<boolean>;
  // prettier-ignore
  playerState: Spotify.PlaybackState | undefined;
  // prettier-ignore
  setPlayerState: React.Dispatch<React.SetStateAction<Spotify.PlaybackState | undefined>>
  playerDuration: string | number;
  // prettier-ignore
  setPlayerDuration: React.Dispatch<React.SetStateAction<string | number>>;
  playerPosition: string | number;
  // prettier-ignore
  setPlayerPosition: React.Dispatch<React.SetStateAction<string | number>>;
  playlistName: string;
  // prettier-ignore
  setPlaylistName: React.Dispatch<React.SetStateAction<string>>
  playlistId: string;
  // prettier-ignore
  setPlaylistId: React.Dispatch<React.SetStateAction<string>>
  shuffleTracksState: boolean;
  // prettier-ignore
  setShuffleTracksState: React.Dispatch<React.SetStateAction<boolean>>
  volume: number;
  // prettier-ignore
  setVolume:React.Dispatch<React.SetStateAction<number>>
};

const PlaybackContext = createContext<PlaybackContext | undefined>(undefined);

export const PlaybackProvider = ({ children }: PlaybackProvider) => {
  const [repeat, setRepeat] = useState<number>(getRepeatRefSessionStorage() || 0);
  const [playerState, setPlayerState] = useState<Spotify.PlaybackState>();
  const [playerDuration, setPlayerDuration] = useState<string | number>('0');
  const [playerPosition, setPlayerPosition] = useState<string | number>('0');
  const [playlistName, setPlaylistName] = useState<string>(getPlaylistNameSessionStorage() || '');
  const [playlistId, setPlaylistId] = useState<string>(getPlaylistIdSessionStorage() || '');
  const [shuffleTracksState, setShuffleTracksState] = useState<boolean>(
    getShuffleTracksRefSessionStorage() || false,
  );
  const [volume, setVolume] = useState<number>(10);

  const repeatRef = useRef<number>(getRepeatRefSessionStorage() || 0);
  const userSkippedTrackRef = useRef<boolean>(false);
  const userPreviousTrackRef = useRef<boolean>(false);
  const shuffleTracksRef = useRef<boolean>(getShuffleTracksRefSessionStorage() || false);
  const isPausedRef = useRef<boolean>(false);

  useEffect(() => {
    addPlaylistIdSessionStorage(playlistId);
    addPlaylistNameSessionStorage(playlistName);
  }, [playlistId, playlistName]);

  return (
    <PlaybackContext.Provider
      value={{
        repeat,
        setRepeat,
        repeatRef,
        userSkippedTrackRef,
        userPreviousTrackRef,
        shuffleTracksRef,
        isPausedRef,
        playerState,
        setPlayerState,
        playerDuration,
        setPlayerDuration,
        playerPosition,
        setPlayerPosition,
        playlistName,
        setPlaylistName,
        playlistId,
        setPlaylistId,
        shuffleTracksState,
        setShuffleTracksState,
        volume,
        setVolume,
      }}
    >
      {children}
    </PlaybackContext.Provider>
  );
};
export { PlaybackContext };

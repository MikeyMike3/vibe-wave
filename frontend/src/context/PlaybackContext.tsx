import { createContext, ReactNode, useRef, useState } from 'react';

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
};

const PlaybackContext = createContext<PlaybackContext | undefined>(undefined);

export const PlaybackProvider = ({ children }: PlaybackProvider) => {
  const [repeat, setRepeat] = useState(0);
  const [playerState, setPlayerState] = useState<Spotify.PlaybackState>();
  const [playerDuration, setPlayerDuration] = useState<string | number>('0');
  const [playerPosition, setPlayerPosition] = useState<string | number>('0');
  const repeatRef = useRef(0);
  const userSkippedTrackRef = useRef(false);
  const userPreviousTrackRef = useRef(false);
  const shuffleTracksRef = useRef(false);
  const isPausedRef = useRef<boolean>(false);

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
      }}
    >
      {children}
    </PlaybackContext.Provider>
  );
};
export { PlaybackContext };

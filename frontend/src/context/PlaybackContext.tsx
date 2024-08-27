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
};

const PlaybackContext = createContext<PlaybackContext | undefined>(undefined);

export const PlaybackProvider = ({ children }: PlaybackProvider) => {
  const [repeat, setRepeat] = useState(0);
  const repeatRef = useRef(0);
  const userSkippedTrackRef = useRef(false);
  const userPreviousTrackRef = useRef(false);

  return (
    <PlaybackContext.Provider
      value={{ repeat, setRepeat, repeatRef, userSkippedTrackRef, userPreviousTrackRef }}
    >
      {children}
    </PlaybackContext.Provider>
  );
};
export { PlaybackContext };

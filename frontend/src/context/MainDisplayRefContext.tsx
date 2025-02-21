import { createContext, ReactNode, RefObject, useRef } from 'react';

type MainDisplayRefProviderProps = {
  children: ReactNode;
};

type MainDisplayRefContext = {
  mainDisplayRef: RefObject<HTMLDivElement>;
};

const MainDisplayRefContext = createContext<MainDisplayRefContext | undefined>(undefined);

export const MainDisplayRefProvider = ({ children }: MainDisplayRefProviderProps) => {
  const mainDisplayRef = useRef<HTMLDivElement | null>(null);

  return (
    <MainDisplayRefContext.Provider value={{ mainDisplayRef }}>
      {children}
    </MainDisplayRefContext.Provider>
  );
};

export { MainDisplayRefContext };

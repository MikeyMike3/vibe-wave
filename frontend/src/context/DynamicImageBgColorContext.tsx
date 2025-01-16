import { createContext, ReactNode, useEffect, useState } from 'react';
import { modifyDynamicBgColor } from '../functions/modifyDynamicBgColor';

type DynamicImageBgColorProviderProps = {
  children: ReactNode;
};

type DynamicImageBgColorContext = {
  dynamicImageBgColorMaster: string;
  setDynamicImageBgColorMaster: React.Dispatch<React.SetStateAction<string>>;
  dynamicImageBgColorDark: string;
  setDynamicImageBgColorDark: React.Dispatch<React.SetStateAction<string>>;
  dynamicImageBgColorMuted: string;
  setDynamicImageBgColorMuted: React.Dispatch<React.SetStateAction<string>>;
};

const DynamicImageBgColorContext = createContext<DynamicImageBgColorContext | undefined>(undefined);

export const DynamicImageBgColorProvider = ({ children }: DynamicImageBgColorProviderProps) => {
  const [dynamicImageBgColorMaster, setDynamicImageBgColorMaster] = useState('');
  const [dynamicImageBgColorDark, setDynamicImageBgColorDark] = useState('');
  const [dynamicImageBgColorMuted, setDynamicImageBgColorMuted] = useState('');

  useEffect(() => {
    setDynamicImageBgColorDark(
      modifyDynamicBgColor(dynamicImageBgColorMaster, 0.8, 0.5) ?? 'rgba(255, 255, 255, 1)',
    );
  }, [dynamicImageBgColorMaster]);

  return (
    <DynamicImageBgColorContext.Provider
      value={{
        dynamicImageBgColorMaster,
        setDynamicImageBgColorMaster,
        dynamicImageBgColorDark,
        setDynamicImageBgColorDark,
        dynamicImageBgColorMuted,
        setDynamicImageBgColorMuted,
      }}
    >
      {children}
    </DynamicImageBgColorContext.Provider>
  );
};

export { DynamicImageBgColorContext };

import { createContext, ReactNode, useEffect, useRef, useState, RefObject } from 'react';
import { modifyDynamicBgColor } from '../functions/modifyDynamicBgColor';
import { getLuminance } from '../functions/getLuminance';

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
  dynamicImageBgColorLighter: string;
  setDynamicImageBgColorLighter: React.Dispatch<React.SetStateAction<string>>;
  dynamicImageBgColorMedium: string;
  setDynamicImageBgColorMedium: React.Dispatch<React.SetStateAction<string>>;

  defaultColorRef: React.MutableRefObject<string>;

  mainDisplayRef: RefObject<HTMLDivElement>;
};

const DynamicImageBgColorContext = createContext<DynamicImageBgColorContext | undefined>(undefined);

export const DynamicImageBgColorProvider = ({ children }: DynamicImageBgColorProviderProps) => {
  const [dynamicImageBgColorMaster, setDynamicImageBgColorMaster] = useState('');
  const [dynamicImageBgColorDark, setDynamicImageBgColorDark] = useState('');
  const [dynamicImageBgColorMuted, setDynamicImageBgColorMuted] = useState('');
  const [dynamicImageBgColorLighter, setDynamicImageBgColorLighter] = useState('');
  const [dynamicImageBgColorMedium, setDynamicImageBgColorMedium] = useState('');

  const mainDisplayRef = useRef<HTMLDivElement | null>(null);

  const defaultColorRef = useRef<string>('rgba(255, 255, 255, 1)');

  useEffect(() => {
    setDynamicImageBgColorDark(
      modifyDynamicBgColor(dynamicImageBgColorMaster, 0.3, 1) ?? defaultColorRef.current,
    );

    // this determines how much brighter of a color is should be based on
    //  how bright or dark the dynamicImageBgColorMaster is.
    if (getLuminance(dynamicImageBgColorMaster) <= 0.1) {
      setDynamicImageBgColorLighter(
        modifyDynamicBgColor(dynamicImageBgColorMaster, 12, 1) ?? defaultColorRef.current,
      );
    } else if (
      getLuminance(dynamicImageBgColorMaster) >= 0.1 &&
      getLuminance(dynamicImageBgColorMaster) <= 0.15
    ) {
      setDynamicImageBgColorLighter(
        modifyDynamicBgColor(dynamicImageBgColorMaster, 5.5, 1) ?? defaultColorRef.current,
      );
    } else if (
      getLuminance(dynamicImageBgColorMaster) >= 0.35 &&
      getLuminance(dynamicImageBgColorMaster) < 0.4
    ) {
      setDynamicImageBgColorLighter(
        modifyDynamicBgColor(dynamicImageBgColorMaster, 2.3, 1) ?? defaultColorRef.current,
      );
    } else if (getLuminance(dynamicImageBgColorMaster) <= 0.4) {
      setDynamicImageBgColorLighter(
        modifyDynamicBgColor(dynamicImageBgColorMaster, 2.8, 1) ?? defaultColorRef.current,
      );
    } else if (
      getLuminance(dynamicImageBgColorMaster) >= 0.4 &&
      getLuminance(dynamicImageBgColorMaster) <= 0.5
    ) {
      setDynamicImageBgColorLighter(
        modifyDynamicBgColor(dynamicImageBgColorMaster, 1.6, 1) ?? defaultColorRef.current,
      );
    } else if (
      getLuminance(dynamicImageBgColorMaster) >= 0.5 &&
      getLuminance(dynamicImageBgColorMaster) <= 0.8
    ) {
      setDynamicImageBgColorLighter(
        modifyDynamicBgColor(dynamicImageBgColorMaster, 1.2, 1) ?? defaultColorRef.current,
      );
    } else if (getLuminance(dynamicImageBgColorMaster) >= 0.8) {
      setDynamicImageBgColorLighter(
        modifyDynamicBgColor(dynamicImageBgColorMaster, 1.1, 1) ?? defaultColorRef.current,
      );
    } else {
      setDynamicImageBgColorLighter(
        modifyDynamicBgColor(dynamicImageBgColorMaster, 1.7, 1) ?? defaultColorRef.current,
      );
    }
  }, [dynamicImageBgColorMaster]);

  useEffect(() => {
    setDynamicImageBgColorMedium(
      modifyDynamicBgColor(dynamicImageBgColorLighter, 0.4, 1) ?? defaultColorRef.current,
    );
    setDynamicImageBgColorMuted(modifyDynamicBgColor(dynamicImageBgColorLighter, 0.7, 1));
  }, [dynamicImageBgColorLighter]);

  return (
    <DynamicImageBgColorContext.Provider
      value={{
        dynamicImageBgColorMaster,
        setDynamicImageBgColorMaster,
        dynamicImageBgColorDark,
        setDynamicImageBgColorDark,
        dynamicImageBgColorMuted,
        setDynamicImageBgColorMuted,
        dynamicImageBgColorLighter,
        setDynamicImageBgColorLighter,
        defaultColorRef,
        dynamicImageBgColorMedium,
        setDynamicImageBgColorMedium,
        mainDisplayRef,
      }}
    >
      {children}
    </DynamicImageBgColorContext.Provider>
  );
};

export { DynamicImageBgColorContext };

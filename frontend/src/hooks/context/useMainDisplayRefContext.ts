import { useContext } from 'react';
import { MainDisplayRefContext } from '../../context/MainDisplayRefContext';

export const useMainDisplayRefContext = () => {
  const mainDisplayRefContext = useContext(MainDisplayRefContext);
  if (!mainDisplayRefContext) {
    throw new Error('Profile must be used within an MainDisplayRef Provider');
  }

  return mainDisplayRefContext;
};

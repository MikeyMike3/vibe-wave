import { useContext } from 'react';
import { DynamicImageBgColorContext } from '../../context/DynamicImageBgColorContext';

export const useDynamicImageBgColorContext = () => {
  const dynamicImageBgColorContext = useContext(DynamicImageBgColorContext);

  if (!dynamicImageBgColorContext) {
    throw new Error('Profile must be used within an DynamicImageBgColorProvider');
  }

  return dynamicImageBgColorContext;
};

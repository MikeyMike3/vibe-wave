import { FastAverageColor } from 'fast-average-color';
import { useDynamicImageBgColorContext } from './context/useDynamicImageBgColorContext';
import { useCallback, useMemo } from 'react';

export const useGetBackgroundImageColor = () => {
  const fac = useMemo(() => new FastAverageColor(), []);
  const { setDynamicImageBgColorMaster } = useDynamicImageBgColorContext();

  const getBackgroundImageColor = useCallback(
    async (imgUrl: string): Promise<void> => {
      try {
        const color = await fac.getColorAsync(imgUrl);
        const rgbaString = color.rgba;
        console.log(rgbaString);
        setDynamicImageBgColorMaster(rgbaString);
      } catch (error) {
        console.error('Error extracting color:', error);
      }
    },
    [fac, setDynamicImageBgColorMaster],
  );

  return getBackgroundImageColor;
};

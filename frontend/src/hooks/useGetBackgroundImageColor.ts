import { FastAverageColor } from 'fast-average-color';
import { useDynamicImageBgColorContext } from './context/useDynamicImageBgColorContext';
import { useCallback, useMemo } from 'react';

export const useGetBackgroundImageColor = () => {
  const fac = useMemo(() => new FastAverageColor(), []);
  const { defaultColorRef } = useDynamicImageBgColorContext();

  const getBackgroundImageColor = useCallback(
    async (imgUrl: string): Promise<string> => {
      try {
        const color = await fac.getColorAsync(imgUrl);
        const rgbaString = color.rgba;
        return rgbaString;
      } catch (error) {
        console.error('Error extracting color:', error);
        return defaultColorRef.current;
      }
    },
    [fac, defaultColorRef],
  );

  return getBackgroundImageColor;
};

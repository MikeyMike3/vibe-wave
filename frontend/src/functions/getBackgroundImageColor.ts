import { FastAverageColor } from 'fast-average-color';

export const getBackgroundImageColor = (
  imgUrl: string,
  setColor: (color: string) => void,
  shouldAddOpacity?: boolean,
) => {
  const fac = new FastAverageColor();

  fac
    .getColorAsync(imgUrl)
    .then(color => {
      const rgbaString = color.rgba;

      const rgbaArray = rgbaString.match(/[\d.]+/g);

      if (rgbaArray) {
        const rgbaValues = rgbaArray.map(Number);

        // Darkening factor
        const darkenFactor = 0.8;
        let darkerColor;

        // Darken the color
        if (shouldAddOpacity) {
          darkerColor = [
            Math.floor(rgbaValues[0] * darkenFactor),
            Math.floor(rgbaValues[1] * darkenFactor),
            Math.floor(rgbaValues[2] * darkenFactor),
            (rgbaValues[3] = 0.5),
          ];
        } else {
          darkerColor = [
            Math.floor(rgbaValues[0] * darkenFactor),
            Math.floor(rgbaValues[1] * darkenFactor),
            Math.floor(rgbaValues[2] * darkenFactor),
            (rgbaValues[3] = 0.8),
          ];
        }

        const darkerColorString = `rgba(${darkerColor.join(',')})`;

        // Set the darker color as background color
        setColor(darkerColorString);
      } else {
        console.error('Invalid rgba string:', rgbaString);
      }
    })
    .catch(error => console.error('Error extracting color:', error));
};

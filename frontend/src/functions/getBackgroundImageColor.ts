import { FastAverageColor } from 'fast-average-color';

export const getBackgroundImageColor = (imgUrl: string, setColor: (color: string) => void) => {
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

        // Darken the color
        const darkerColor = [
          Math.floor(rgbaValues[0] * darkenFactor),
          Math.floor(rgbaValues[1] * darkenFactor),
          Math.floor(rgbaValues[2] * darkenFactor),
          rgbaValues[3], // Keep the alpha (opacity) the same
        ];

        const darkerColorString = `rgba(${darkerColor.join(',')})`;

        // Set the darker color as background color
        setColor(darkerColorString);
      } else {
        console.error('Invalid rgba string:', rgbaString);
      }
    })
    .catch(error => console.error('Error extracting color:', error));
};

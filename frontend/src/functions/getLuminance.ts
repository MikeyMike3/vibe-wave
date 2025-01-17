// this determines how bright a color is. The purpose of this is so you can change the color of the
//  dynamically colored buttons/background depending on how bright or dark the color is.
// it returns a value between 0 - 1
export const getLuminance = (rgb: string) => {
  const rgbArray = rgb.match(/[\d.]+/g);

  if (rgbArray) {
    const rgbValues = rgbArray.map(Number);
    return (0.2126 * rgbValues[0] + 0.7152 * rgbValues[1] + 0.0722 * rgbValues[2]) / 255;
  } else return 0;
};

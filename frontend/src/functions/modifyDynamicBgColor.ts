export const modifyDynamicBgColor = (color: string, modifyFactor: number, alpha: number) => {
  const rgbaArray = color.match(/[\d.]+/g);

  let colorModified;

  if (rgbaArray) {
    const rgbaValues = rgbaArray.map(Number);
    colorModified = [
      Math.floor(rgbaValues[0] * modifyFactor),
      Math.floor(rgbaValues[1] * modifyFactor),
      Math.floor(rgbaValues[2] * modifyFactor),
      (rgbaValues[3] = alpha),
    ];
  }

  return colorModified;
};

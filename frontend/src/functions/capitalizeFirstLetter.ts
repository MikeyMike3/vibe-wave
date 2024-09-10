export const capitalizeFirstLetter = (word: string) => {
  if (!word) return ''; // Check if the string is empty
  return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
};

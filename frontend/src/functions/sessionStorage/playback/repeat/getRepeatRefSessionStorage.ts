export const getRepeatRefSessionStorage = (): number => {
  const storedValue = sessionStorage.getItem('repeatRef');
  return storedValue ? JSON.parse(storedValue) : 0;
};

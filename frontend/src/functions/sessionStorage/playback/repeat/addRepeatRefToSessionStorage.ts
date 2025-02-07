export const addRepeatRefSessionStorage = (value: number) => {
  sessionStorage.setItem('repeatRef', JSON.stringify(value));
};

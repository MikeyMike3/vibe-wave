export const formatTime = (timeInMs: string | number) => {
  const timeInMsNumber = Number(timeInMs);
  const minutes = Math.floor(timeInMsNumber / 60000);
  const seconds = Math.floor((timeInMsNumber % 60000) / 1000);
  return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
};

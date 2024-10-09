export const formatTime = (timeInMs: string | number | undefined) => {
  if (!timeInMs) {
    return '0:00';
  }
  const timeInMsNumber = Number(timeInMs);
  const minutes = Math.floor(timeInMsNumber / 60000);
  const seconds = Math.floor((timeInMsNumber % 60000) / 1000);
  return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
};

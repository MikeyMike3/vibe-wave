export const addPlayerPositionSessionStorage = (playerPosition: number) => {
  const playerPositionString = playerPosition.toString();
  return sessionStorage.setItem('playerPosition', playerPositionString);
};

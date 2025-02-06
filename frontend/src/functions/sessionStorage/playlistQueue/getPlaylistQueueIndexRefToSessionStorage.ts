export const getPlaylistQueueIndexRefFromSessionStorage = () => {
  try {
    const storedValue = sessionStorage.getItem('playlistQueueIndex');
    return storedValue !== null ? parseFloat(storedValue) - 1 : null;
  } catch (error) {
    console.error(`Failed to retrieve playlistQueueIndex from sessionStorage:`, error);
    return null;
  }
};

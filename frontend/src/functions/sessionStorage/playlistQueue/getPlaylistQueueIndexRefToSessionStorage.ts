export const getPlaylistQueueIndexRefFromSessionStorage = () => {
  try {
    const storedValue = sessionStorage.getItem('playlistQueueIndex');
    return storedValue !== null ? parseFloat(storedValue) : null;
  } catch (error) {
    console.error(`Failed to retrieve playlistQueueIndex from sessionStorage:`, error);
    return null;
  }
};

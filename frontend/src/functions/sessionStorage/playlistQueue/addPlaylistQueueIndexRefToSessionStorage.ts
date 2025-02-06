export const addPlaylistQueueIndexRefToSessionStorage = (value: number) => {
  try {
    sessionStorage.setItem('playlistQueueIndex', value.toString());
  } catch (error) {
    console.error(`Failed to store playlistQueueIndex in sessionStorage:`, error);
  }
};

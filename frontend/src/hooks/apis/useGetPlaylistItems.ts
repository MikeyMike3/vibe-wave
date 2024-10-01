import { useState } from 'react';
import { useHeaders } from './useHeaders';

export const useGetPlaylistItems = (playlistId: string | undefined, updateState?: boolean) => {
  const [playlistItems, setPlaylistItems] = useState<SpotifyApi.PlaylistTrackResponse>();
  const accessToken = sessionStorage.getItem('accessToken');
  const apiHeaders = useHeaders(accessToken);

  const getPlaylistItems = async () => {
    try {
      const response = await fetch(
        `https://api.spotify.com/v1/playlists/${playlistId}/tracks`,
        apiHeaders,
      );

      if (response.ok) {
        const data = await response.json();
        setPlaylistItems(data);
        return data;
      }
    } catch (error) {
      console.error(error);
    }
  };

  if (updateState) {
    getPlaylistItems();
  }

  return { getPlaylistItems, playlistItems };
};

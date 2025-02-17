import { useQuery } from '@tanstack/react-query';
import { useHeaders } from './useHeaders';

export const useFetchAlbum = (albumId: string | undefined) => {
  const apiHeader = useHeaders();
  const fetchAlbum = async () => {
    try {
      const response = await fetch(`https://api.spotify.com/v1/albums/${albumId}`, apiHeader);

      if (!response.ok) {
        throw new Error('error fetching albums');
      }

      const album: SpotifyApi.SingleAlbumResponse = await response.json();

      const data: SpotifyApi.SingleAlbumResponse = {
        ...album,
        tracks: {
          ...album.tracks,
          items: album.tracks.items.map(track => ({
            ...track,
            albumId: album.id,
            images: album.images,
          })),
        },
      };

      return data;
    } catch (error) {
      console.error('Error when fetching albums', error);
      throw error;
    }
  };
  const {
    data: album,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['album', albumId],
    queryFn: fetchAlbum,
  });

  return { album, isError, isLoading };
};

import { useMutation } from '@tanstack/react-query';
import { useHeaders } from './useHeaders';

export const useFetchArtistGenres = () => {
  const apiHeader = useHeaders();
  const fetchArtistGenres = async (artistId: string) => {
    try {
      const response = await fetch(`https://api.spotify.com/v1/artists/${artistId}`, apiHeader);

      if (!response.ok) {
        throw new Error('Error fetching artist info');
      }

      const data: SpotifyApi.ArtistObjectFull = await response.json();
      return data.genres;
    } catch (error) {
      console.error('Error fetching artist info', error);
      throw error;
    }
  };
  const { mutateAsync: fetchArtistGenresMutation } = useMutation({
    mutationFn: fetchArtistGenres,
  });
  return fetchArtistGenresMutation;
};

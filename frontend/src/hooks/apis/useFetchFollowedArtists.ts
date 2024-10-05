import { useQuery } from '@tanstack/react-query';
import { useHeaders } from './useHeaders';

export const useFetchFollowedArtists = () => {
  const accessToken = sessionStorage.getItem('accessToken');
  const apiHeader = useHeaders(accessToken);
  const fetchFollowedArtists = async () => {
    try {
      const response = await fetch('https://api.spotify.com/v1/me/following', apiHeader);

      if (!response.ok) {
        throw new Error('Error fetching followed artists');
      }
      //prettier-ignore
      const data:SpotifyApi.CursorBasedPagingObject<SpotifyApi.ArtistObjectFull> = await response.json();
      return data;
    } catch (error) {
      throw error;
    }
  };
  const {
    data: followedArtists,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['followedArtists'],
    queryFn: fetchFollowedArtists,
    enabled: !!accessToken,
  });
  return { followedArtists, isLoading, isError };
};

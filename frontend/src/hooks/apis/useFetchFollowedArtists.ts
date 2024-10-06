import { useQuery } from '@tanstack/react-query';
import { useHeaders } from './useHeaders';

export const useFetchFollowedArtists = () => {
  const apiHeader = useHeaders();
  const fetchFollowedArtists = async () => {
    try {
      const response = await fetch(
        'https://api.spotify.com/v1/me/following?type=artist',
        apiHeader,
      );

      if (!response.ok) {
        throw new Error('Error fetching followed artists');
      }

      //prettier-ignore
      const data: { artists: SpotifyApi.CursorBasedPagingObject<SpotifyApi.ArtistObjectFull> } = await response.json();

      let allFollowedArtists = [...data.artists.items];
      let nextPageUrl = data.artists.next;

      while (nextPageUrl) {
        try {
          const nextPageResponse = await fetch(nextPageUrl, apiHeader);

          if (!nextPageResponse.ok) {
            throw new Error('Error fetching additional followed artists');
          }

          //prettier-ignore
          const nextPageData: { artists: SpotifyApi.CursorBasedPagingObject<SpotifyApi.ArtistObjectFull> } = await nextPageResponse.json();

          allFollowedArtists = allFollowedArtists.concat(nextPageData.artists.items);
          nextPageUrl = nextPageData.artists.next;
        } catch (error) {
          console.error('Error fetching additional artists:', error);
          throw error;
        }
      }

      return { ...data, artists: { ...data.artists, items: allFollowedArtists } };
    } catch (error) {
      console.log('Error fetching followed artists:', error);
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
  });
  return { followedArtists, isLoading, isError };
};

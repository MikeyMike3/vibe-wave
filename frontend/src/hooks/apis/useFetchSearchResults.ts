import { useQuery } from '@tanstack/react-query';
import { useHeaders } from '../../hooks/apis/useHeaders';
import { useSearchContext } from '../context/useSearchContext';

export const useFetchSearchResults = (query: string) => {
  const { setSearchResults } = useSearchContext();
  const accessToken = sessionStorage.getItem('accessToken');
  const apiHeaders = useHeaders(accessToken);

  const fetchSearchResults = async ({ queryKey }: { queryKey: [string, string | null] }) => {
    const [, searchQuery] = queryKey;
    const type = ['track', 'album', 'artist'];

    if (!searchQuery) {
      throw new Error('No search query provided');
    }

    try {
      const response = await fetch(
        `https://api.spotify.com/v1/search?q=${encodeURIComponent(query)}&type=${type}`,
        apiHeaders,
      );

      if (response.ok) {
        const data: SpotifyApi.SearchResponse = await response.json();
        setSearchResults(data);
        return data || {};
      } else {
        throw new Error('Failed to fetch search results');
      }
    } catch (error) {
      console.error('Error fetching search results:', error);
      return {};
    }
  };

  return useQuery({
    queryKey: ['searchResults', query],
    queryFn: fetchSearchResults,
    enabled: !!accessToken && !!query,
  });
};

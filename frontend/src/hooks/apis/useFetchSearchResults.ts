import { useCallback } from 'react';
import { useHeaders } from '../../hooks/apis/useHeaders';
import { useSearchContext } from '../context/useSearchContext';

export const useFetchSearchResults = () => {
  const { setSearchResults } = useSearchContext();
  const accessToken = sessionStorage.getItem('accessToken');
  const apiHeaders = useHeaders(accessToken);

  const fetchSearchResults = useCallback(
    async (query: string) => {
      const type = ['track', 'album', 'artist'];
      try {
        const response = await fetch(
          `https://api.spotify.com/v1/search?q=${encodeURIComponent(query)}&type=${type}`,
          apiHeaders,
        );
        if (response.ok) {
          const data = await response.json();
          setSearchResults(data);
        } else {
          throw new Error('Failed to fetch search results');
        }
      } catch (error) {
        console.error('Error fetching search results:', error);
      }
    },
    [setSearchResults, apiHeaders], // Add dependencies here
  );

  return fetchSearchResults;
};

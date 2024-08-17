import { useEffect, useState } from 'react';
import { useHeaders } from '../useHeaders';

export const useFetchSearchResults = (query: string) => {
  const [searchResults, setSearchResults] = useState<SpotifyApi.SearchResponse>();
  const accessToken = sessionStorage.getItem('accessToken');
  const apiHeaders = useHeaders(accessToken);

  useEffect(() => {
    if (query !== '') {
      const fetchSearchResults = async (query: string) => {
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
            throw new Error();
          }
        } catch {
          throw new Error();
        }
      };

      fetchSearchResults(query);
    }
  }, [apiHeaders, query]);

  return { searchResults };
};

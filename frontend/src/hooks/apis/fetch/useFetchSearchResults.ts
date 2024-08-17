import { useEffect, useState } from 'react';
import { useHeaders } from '../useHeaders';

export const useFetchSearchResults = () => {
  const [searchResults, setSearchResults] = useState([]);
  const accessToken = sessionStorage.getItem('accessToken');
  const apiHeaders = useHeaders(accessToken);

  const query = 'all of the lights';
  const type = 'track';

  useEffect(() => {
    const fetchSearchResults = async () => {
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
    fetchSearchResults();
  });

  return searchResults;
};

import { SearchResultTrackItem } from '../components/SearchResultTrackItem';
import { useFetchSearchResults } from '../hooks/apis/useFetchSearchResults';
import { useSearchContext } from '../hooks/context/useSearchContext';

export const Search = () => {
  const { query } = useSearchContext();
  const { searchResults } = useFetchSearchResults(query);
  return (
    <div>
      {searchResults?.tracks?.items.map(item => (
        <SearchResultTrackItem key={item.id} track={item} />
      ))}
    </div>
  );
};

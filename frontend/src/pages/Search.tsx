import { SearchResultTrackItem } from '../components/SearchResultTrackItem';
import { useSearchContext } from '../hooks/context/useSearchContext';

export const Search = () => {
  const { searchResults } = useSearchContext();

  return (
    <div>
      {searchResults?.tracks?.items.map(item => (
        <SearchResultTrackItem key={item.id} track={item} />
      ))}
    </div>
  );
};

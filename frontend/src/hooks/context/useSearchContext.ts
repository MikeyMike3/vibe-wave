import { useContext } from 'react';
import { SearchContext } from '../../context/SearchContext';

export const useSearchContext = () => {
  const searchContext = useContext(SearchContext);
  if (!searchContext) {
    throw new Error('Profile must be used within an SearchProvider');
  }
  return searchContext;
};

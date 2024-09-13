import { createContext, ReactNode, useState } from 'react';

type SearchProviderProps = {
  children: ReactNode;
};

type SearchContext = {
  query: string;
  //prettier-ignore
  setQuery: React.Dispatch<React.SetStateAction<string>>
};

const SearchContext = createContext<SearchContext | undefined>(undefined);

export const SearchProvider = ({ children }: SearchProviderProps) => {
  const [query, setQuery] = useState<string>('');

  return <SearchContext.Provider value={{ query, setQuery }}>{children}</SearchContext.Provider>;
};

export { SearchContext };

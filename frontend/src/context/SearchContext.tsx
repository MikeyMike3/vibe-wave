import { createContext, ReactNode, useState } from 'react';

type SearchProviderProps = {
  children: ReactNode;
};

type SearchContext = {
  query: string;
  //prettier-ignore
  setQuery: React.Dispatch<React.SetStateAction<string>>
  searchResults: SpotifyApi.SearchResponse;
  //prettier-ignore
  setSearchResults: React.Dispatch<React.SetStateAction<SpotifyApi.SearchResponse>>;
};

const SearchContext = createContext<SearchContext | undefined>(undefined);

export const SearchProvider = ({ children }: SearchProviderProps) => {
  const [query, setQuery] = useState<string>('');
  const [searchResults, setSearchResults] = useState<SpotifyApi.SearchResponse>({});

  return (
    <SearchContext.Provider value={{ query, setQuery, searchResults, setSearchResults }}>
      {children}
    </SearchContext.Provider>
  );
};

export { SearchContext };

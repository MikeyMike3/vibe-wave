import React, { useRef, useState } from 'react';
import { useFetchSearchResults } from '../hooks/apis/useFetchSearchResults';
import { SearchResultTrackItem } from './SearchResultTrackItem';
import { Link } from 'react-router-dom';

export const SearchBar = () => {
  const [query, setQuery] = useState<string>('');
  const inputRef = useRef<HTMLInputElement>(null);
  const { searchResults, setSearchResults } = useFetchSearchResults(query);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputRef.current?.value) {
      setQuery(inputRef.current?.value);
    }
  };
  // prettier-ignore
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (inputRef.current?.value) {
        inputRef.current.value = e.target.value;
      }
  
      if (inputRef.current?.value.length === 0) {
        setSearchResults({})
      }
      
    };

  return (
    <div className="sticky top-0 z-[9999] flex w-full justify-center bg-black">
      <Link to={'/search'}>
        <form onSubmit={handleSubmit} className="flex py-5">
          <input
            className="w-[500px]"
            ref={inputRef}
            onChange={handleChange}
            placeholder="Search"
          ></input>
          <button onClick={handleSubmit}>Search</button>
        </form>
      </Link>
      {searchResults?.tracks?.items.map(item => (
        <SearchResultTrackItem key={item.id} track={item} />
      ))}
    </div>
  );
};

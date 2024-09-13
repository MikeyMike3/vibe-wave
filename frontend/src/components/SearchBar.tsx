import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useSearchContext } from '../hooks/context/useSearchContext';
import { useFetchSearchResults } from '../hooks/apis/useFetchSearchResults';

export const SearchBar = () => {
  const { setSearchResults, query, setQuery } = useSearchContext();
  const fetchSearchResults = useFetchSearchResults();

  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputRef.current?.value) {
      fetchSearchResults(query);
    }
  };
  // prettier-ignore
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (inputRef.current?.value) {
        inputRef.current.value = e.target.value;
        setQuery(inputRef.current.value)
      }
  
      if (inputRef.current?.value.length === 0) {
        setSearchResults({})
      }
      
    };

  useEffect(() => {
    if (query.length > 0) {
      fetchSearchResults(query);
    }
  }, [query, fetchSearchResults]);

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
    </div>
  );
};

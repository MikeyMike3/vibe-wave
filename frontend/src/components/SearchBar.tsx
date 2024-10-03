import React, { useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useSearchContext } from '../hooks/context/useSearchContext';
import { useFetchSearchResults } from '../hooks/apis/useFetchSearchResults';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@awesome.me/kit-71c07605c0/icons/sharp/solid';

export const SearchBar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const { setSearchResults, query, setQuery } = useSearchContext();
  const { data: searchResult } = useFetchSearchResults(query);

  const inputRef = useRef<HTMLInputElement>(null);
  const debounceTimeout = useRef<number | undefined>(undefined);

  const debounceDelay = 500;

  //prettier-ignore
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (debounceTimeout.current) {
      clearTimeout(debounceTimeout.current);
    }

    debounceTimeout.current = window.setTimeout(() => {
      const value = e.target.value;
      setQuery(value);

      if (value.length === 0) {
        setSearchResults({});
      }
    }, debounceDelay);
  };

  useEffect(() => {
    if (searchResult) {
      setSearchResults(searchResult);
    }
  }, [searchResult, setSearchResults]);

  return (
    <div className="sticky top-0 z-[9999] flex w-full justify-center bg-black">
      <form onSubmit={e => e.preventDefault()} onClick={() => navigate('/search')} className="py-3">
        <div
          className={`flex items-center gap-2 rounded-full border-2 bg-bgAccent px-6 py-2 transition duration-150 ${location.pathname.includes('/search') ? 'border-2 border-magenta' : 'border-transparent'}`}
        >
          <FontAwesomeIcon
            className="text-3xl text-textAccent duration-150 hover:cursor-pointer hover:text-textPrimary"
            icon={faMagnifyingGlass}
          />
          <input
            className="w-[500px] rounded-xl bg-bgAccent p-2 text-white outline-none placeholder:text-textAccent"
            ref={inputRef}
            onChange={handleChange}
            placeholder="Search"
          />
        </div>
      </form>
    </div>
  );
};

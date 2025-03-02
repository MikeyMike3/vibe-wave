import React, { useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useSearchContext } from '../hooks/context/useSearchContext';
import { useFetchSearchResults } from '../hooks/apis/useFetchSearchResults';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@awesome.me/kit-71c07605c0/icons/sharp/solid';

export const SearchBar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const { setSearchResults, query, setQuery } = useSearchContext();
  useFetchSearchResults(query);

  const inputRef = useRef<HTMLInputElement>(null);
  const debounceTimeout = useRef<number | undefined>(undefined);

  const debounceDelay = 200;

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

  return (
    <div className="sticky top-0 z-[9998] flex w-full justify-center bg-black">
      <form onSubmit={e => e.preventDefault()} onClick={() => navigate('/search')} className="py-3">
        <div
          className={`flex items-center gap-2 rounded-full border-2 bg-bgAccent px-3 py-2 transition duration-150 lg:px-6 ${location.pathname.includes('/search') ? 'border-2 border-magenta' : 'border-transparent'}`}
        >
          <FontAwesomeIcon
            className="text-xl text-textAccent duration-150 hover:cursor-pointer hover:text-textPrimary lg:text-3xl"
            icon={faMagnifyingGlass}
          />
          <input
            style={{
              width: 'calc(100vw - 850px)',
              maxWidth: '590px',
              minWidth: '250px',
            }}
            className="rounded-xl bg-bgAccent p-1 text-white outline-none placeholder:text-textAccent lg:p-2"
            ref={inputRef}
            onChange={handleChange}
            placeholder="Search"
          />
        </div>
      </form>
    </div>
  );
};

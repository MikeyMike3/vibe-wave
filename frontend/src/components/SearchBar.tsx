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
  const fetchSearchResults = useFetchSearchResults();

  const inputRef = useRef<HTMLInputElement>(null);

  //prettier-ignore
  const handleChange = (e:  React.ChangeEvent<HTMLInputElement>) => {
    if (inputRef.current?.value) {
      inputRef.current.value = e.target.value;
      setQuery(inputRef.current.value);
    }

    if (inputRef.current?.value.length === 0) {
      setSearchResults({});
    }
  };

  useEffect(() => {
    if (query.length > 0) {
      fetchSearchResults(query);
    }
  }, [query, fetchSearchResults]);

  return (
    <div className="sticky top-0 z-[9999] flex w-full justify-center bg-black">
      <form onClick={() => navigate('/search')} className="flex items-center py-3">
        <div
          className={`${location.pathname.includes('/search') && 'border-2 border-magenta border-transparent'}flex items-center gap-2 rounded-full bg-bgAccent px-6 py-2 transition duration-150`}
        >
          <FontAwesomeIcon
            className="text-3xl text-textAccent duration-150 hover:text-textPrimary"
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

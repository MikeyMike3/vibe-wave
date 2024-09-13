import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { useSearchContext } from '../hooks/context/useSearchContext';

export const SearchBar = () => {
  const { setQuery } = useSearchContext();
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputRef.current?.value) {
      setQuery(inputRef.current?.value);
    }
  };

  return (
    <div className="sticky top-0 z-[9999] flex w-full justify-center bg-black">
      <Link to={'/search'}>
        <form onSubmit={handleSubmit} className="flex py-5">
          <input className="w-[500px]" ref={inputRef} placeholder="Search"></input>
          <button onClick={handleSubmit}>Search</button>
        </form>
      </Link>
    </div>
  );
};

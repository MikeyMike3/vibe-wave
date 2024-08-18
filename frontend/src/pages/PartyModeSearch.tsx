import { useRef, useState } from 'react';
import { useFetchSearchResults } from '../hooks/apis/fetch/useFetchSearchResults';

export const PartyModeSearch = () => {
  const [query, setQuery] = useState<string>('');
  const inputRef = useRef<HTMLInputElement>(null);
  const { searchResults, setSearchResults } = useFetchSearchResults(query);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(inputRef.current?.value);
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
    <div>
      <form onSubmit={handleSubmit} className="flex">
        <input ref={inputRef} onChange={handleChange} placeholder="Search"></input>
        <button onClick={handleSubmit}>Search</button>
      </form>
      {searchResults?.tracks?.items.map(item => (
        <>
          <p key={item.id}>{item.name}</p> <img src={item.album.images[0].url} />
        </>
      ))}
    </div>
  );
};

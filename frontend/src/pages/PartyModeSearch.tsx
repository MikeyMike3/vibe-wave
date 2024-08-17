import { useEffect, useState } from 'react';
import { useFetchSearchResults } from '../hooks/apis/fetch/useFetchSearchResults';

export const PartyModeSearch = () => {
  const [query, setQuery] = useState<string>('');
  const { searchResults } = useFetchSearchResults(query);

  let value: string;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setQuery(value);
  };
  // prettier-ignore
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    value = e.target.value;
  };

  useEffect(() => {
    console.log(searchResults);
  }, [searchResults]);
  return (
    <div>
      <form onSubmit={handleSubmit} className="flex">
        <input onChange={handleChange} placeholder="Search"></input>
        <button onClick={handleSubmit}>Search</button>
      </form>
      {searchResults?.tracks.items.map(item => <p key={item.id}>{item.name}</p>)}
    </div>
  );
};

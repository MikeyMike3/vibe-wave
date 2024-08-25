import { useRef, useState } from 'react';
import { useFetchSearchResults } from '../hooks/apis/useFetchSearchResults';
import { SearchResultTrackItem } from '../components/SearchResultTrackItem';
import { useSpotifyPlayerContext } from '../hooks/context/useSpotifyPlayerContext';
import { togglePlay } from '../functions/spotifyPlayer/togglePlay';

export const PartyModeSearch = () => {
  const [query, setQuery] = useState<string>('');
  const inputRef = useRef<HTMLInputElement>(null);
  const { searchResults, setSearchResults } = useFetchSearchResults(query);
  const { player } = useSpotifyPlayerContext();

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
    <div className="flex-1 overflow-y-scroll">
      <button onClick={() => togglePlay(player)}>Pause Play</button>
      <form onSubmit={handleSubmit} className="flex">
        <input ref={inputRef} onChange={handleChange} placeholder="Search"></input>
        <button onClick={handleSubmit}>Search</button>
      </form>
      {searchResults?.tracks?.items.map(item => (
        <SearchResultTrackItem key={item.id} track={item} />
      ))}
    </div>
  );
};

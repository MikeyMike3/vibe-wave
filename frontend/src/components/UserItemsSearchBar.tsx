import { useEffect } from 'react';

type userPlaylists =
  | {
      items: SpotifyApi.PlaylistObjectSimplified[];
      href: string;
      limit: number;
      next: string | null;
      offset: number;
      previous: string | null;
      total: number;
    }
  | undefined;

type UserItemsSearchBarProps = {
  inputState: string;
  setInputState: React.Dispatch<React.SetStateAction<string>>;
  placeHolder: string;
  state: SpotifyApi.PlaylistTrackResponse | userPlaylists | undefined;
  setFilteredArray:
    | React.Dispatch<React.SetStateAction<SpotifyApi.PlaylistObjectSimplified[] | undefined>>
    | React.Dispatch<React.SetStateAction<SpotifyApi.PlaylistTrackObject[] | undefined>>;
};

const isPlaylistTrackResponse = (
  state: SpotifyApi.PlaylistTrackResponse | userPlaylists | undefined,
): state is SpotifyApi.PlaylistTrackResponse =>
  typeof state === 'object' &&
  state !== null &&
  'items' in state &&
  Array.isArray(state.items) &&
  state.items.some(item => 'track' in item && typeof item.track === 'object');

const isUserPlaylists = (
  state: SpotifyApi.PlaylistTrackResponse | userPlaylists | undefined,
): state is userPlaylists =>
  typeof state === 'object' && state !== null && 'items' in state && !('tracks' in state);

export const UserItemsSearchBar = ({
  inputState,
  setInputState,
  placeHolder,
  state,
  setFilteredArray,
}: UserItemsSearchBarProps) => {
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputState(e.target.value);
  };

  useEffect(() => {
    const lowerCaseInput = inputState.toLowerCase();

    if (isPlaylistTrackResponse(state)) {
      const filtered = state.items.filter(item =>
        item?.track?.name?.toLowerCase().includes(lowerCaseInput),
      );
      setFilteredArray(filtered);
    } else if (isUserPlaylists(state)) {
      const filtered = state?.items.filter(item =>
        item?.name?.toLowerCase().includes(lowerCaseInput),
      );
      setFilteredArray(filtered);
    } else {
      console.warn('Incorrect Type');
    }

    if (inputState.length === 0) {
      setInputState('');
    }
  }, [inputState, state, setFilteredArray, setInputState]);

  return <input placeholder={placeHolder} onChange={onChange}></input>;
};

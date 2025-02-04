import { useState } from 'react';

type UserItemsSearchBarProps = {
  handleInputChangeFunction: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
};

export const UserItemsSearchBar = ({
  handleInputChangeFunction,
  placeholder,
}: UserItemsSearchBarProps) => {
  const [active, setActive] = useState(false);
  return (
    <input
      className={`${active ? 'border-magenta' : 'border-transparent'} w-[300px] rounded-xl border-2 bg-bgAccent p-2 text-white outline-none placeholder:text-textAccent`}
      onBlur={() => setActive(false)}
      onClick={() => setActive(true)}
      placeholder={placeholder}
      onChange={handleInputChangeFunction}
    ></input>
  );
};

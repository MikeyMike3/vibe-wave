type UserItemsSearchBarProps = {
  handleInputChangeFunction: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
};

export const UserItemsSearchBar = ({
  handleInputChangeFunction,
  placeholder,
}: UserItemsSearchBarProps) => {
  return <input placeholder={placeholder} onChange={handleInputChangeFunction}></input>;
};

import type { ChangeEvent, FormEvent, ReactNode, SetStateAction } from 'react';
import { useState } from 'react';
import type { SetURLSearchParams } from 'react-router-dom';

import classes from './search.module.css';

interface SearchProps {
  handleSearchValue: (value: string) => void;
  searchValue: string;
  setSavedValue: React.Dispatch<SetStateAction<string>>;
  setSearchParams: SetURLSearchParams;
}

export const Search = (props: SearchProps): ReactNode => {
  const [inputValue, setInputValue] = useState(props.searchValue);

  const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setInputValue(event.target.value);
  };

  const handleSubmit = (): void => {
    const value = inputValue.trim();

    props.setSearchParams({ page: '1', pageSize: '20', search: value });
    props.setSavedValue(value);
    props.handleSearchValue(value);
  };

  return (
    <form
      className={classes.form}
      onSubmit={(e: FormEvent) => {
        e.preventDefault();
        handleSubmit();
      }}
    >
      <input
        className={classes.input}
        onChange={(event: ChangeEvent<HTMLInputElement>) => handleChange(event)}
        placeholder="Search"
        type="search"
        value={inputValue}
      ></input>

      <button className={classes.button} type="submit">
        Search
      </button>
    </form>
  );
};

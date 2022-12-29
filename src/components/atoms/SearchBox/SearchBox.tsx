import React from "react";
import cx from "classnames";
import styles from "./SearchBox.module.css";

type SearchBoxProps = {
  inputValue: string;
  className?: string[];
  handleOnChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleKeyPress: (event: React.KeyboardEvent<HTMLElement>) => void;
  handleKeyUp: (event: React.KeyboardEvent<HTMLElement>) => void;
};

export const SearchBox = ({
  inputValue,
  className = [""],
  handleOnChange,
  handleKeyPress,
  handleKeyUp
}: SearchBoxProps) => {
  return (
    <input
      value={inputValue}
      className={cx(
        styles.BookSearcher,
        className!.map(c => styles[c])
      )}
      onChange={e => handleOnChange(e)}
      onKeyPress={handleKeyPress}
      onKeyUp={handleKeyUp}
    />
  );
};

export default SearchBox;

import React, { ReactNode } from "react";
import cx from "classnames";
import styles from "./SearchBox.module.css";

type SearchBoxProps = {
  inputValue: string;
  className?: string[];
  handleOnChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleKeyPress: (event: React.KeyboardEvent<HTMLElement>) => void;
  handleKeyUp: (event: React.KeyboardEvent<HTMLElement>) => void;
  child?: ReactNode;
};

export const SearchBox = (props: SearchBoxProps) => {
  const {
    inputValue,
    className,
    handleOnChange,
    handleKeyPress,
    handleKeyUp
  } = props;

  return (
    <input
      value={inputValue}
      className={cx(styles.BookSearcher, className!.map(c => styles[c]))}
      onChange={e => handleOnChange(e)}
      onKeyPress={handleKeyPress}
      onKeyUp={handleKeyUp}
    />
  );
};

SearchBox.defaultProps = {
  className: [""]
};

export default SearchBox;

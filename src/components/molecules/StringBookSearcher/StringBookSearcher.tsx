import React, {
  // RefObject
} from "react";
import cx from "classnames";
import SearchBox from "../../atoms/SearchBox";
import SearchIcon from "../../atoms/SearchIcon";
import styles from "./StringBookSearcher.module.css";

type StringBookSearcher = {
  inputValue: string;
  className?: string[];
  handleClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
  handleOnChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleKeyPress: (event: React.KeyboardEvent<HTMLElement>) => void;
  handleKeyUp: (event: React.KeyboardEvent<HTMLElement>) => void;
};

export const StringBookSearcher = (props: StringBookSearcher) => {
  const {
    inputValue,
    className,
    handleOnChange,
    handleKeyPress,
    handleKeyUp,
    handleClick
  } = props;
  return (
    <div
      className={cx(styles.SearchBoxWrapper, className!.map(c => styles[c]))}
    >
      <SearchBox
        inputValue={inputValue}
        className={className}
        handleOnChange={handleOnChange}
        handleKeyPress={handleKeyPress}
        handleKeyUp={handleKeyUp}
      />
      <SearchIcon handleClick={handleClick} className={className} />
    </div>
  );
};

export default StringBookSearcher;

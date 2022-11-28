import React, { ReactNode } from "react";
import cx from "classnames";
import styles from "./BorrowUserNameInput.module.css";

type BorrowUserNameInputProps = {
//   inputValue: string;
  placeValue: string;
  className?: string[];
  handleOnChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
//   handleKeyPress: (event: React.KeyboardEvent<HTMLElement>) => void;
//   handleKeyUp: (event: React.KeyboardEvent<HTMLElement>) => void;
  child?: ReactNode;
};

export const BorrowUserNameInput = (props: BorrowUserNameInputProps) => {
  const {
    // inputValue,
    placeValue,
    className,
    handleOnChange,
    // handleKeyPress,
    // handleKeyUp
  } = props;

  return (
    <input
    //   value={inputValue}
      placeholder={placeValue}
      onChange={e => handleOnChange(e)}
      className={cx(styles.BorrowUserNameInput, className!.map(c => styles[c]))}
    //   onChange={e => handleOnChange(e)}
    //   onKeyPress={handleKeyPress}
    //   onKeyUp={handleKeyUp}
    />
  );
};

BorrowUserNameInput.defaultProps = {
  className: [""]
};

export default BorrowUserNameInput;

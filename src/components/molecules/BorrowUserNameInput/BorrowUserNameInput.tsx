import React, { ReactNode } from "react";
import cx from "classnames";
import styles from "./BorrowUserNameInput.module.css";

type BorrowUserNameInputProps = {
  placeValue: string;
  className?: string[];
  handleOnChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  child?: ReactNode;
};

export const BorrowUserNameInput = (props: BorrowUserNameInputProps) => {
  const { placeValue, className, handleOnChange } = props;

  return (
    <input
      placeholder={placeValue}
      onChange={e => handleOnChange(e)}
      className={cx(styles.BorrowUserNameInput, className!.map(c => styles[c]))}
    />
  );
};

BorrowUserNameInput.defaultProps = {
  className: [""]
};

export default BorrowUserNameInput;

import React from "react";
import styles from "./BorrowUserNameInput.module.css";

type BorrowUserNameInputProps = {
  placeValue: string;
  handleOnChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

export const BorrowUserNameInput = ({
  placeValue,
  handleOnChange
}: BorrowUserNameInputProps) => {
  return (
    <input
      placeholder={placeValue}
      onChange={e => handleOnChange(e)}
      className={styles.BorrowUserNameInput}
    />
  );
};

export default BorrowUserNameInput;

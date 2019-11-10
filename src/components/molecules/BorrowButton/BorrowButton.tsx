import React, { Children } from "react";
import cx from "classnames";
import styles from "./BorrowButton.module.css";

type BorrowButtonProps = {
  className?: string[];
  name: string;
  handleClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
};

export const BorrowButton = (props: BorrowButtonProps) => {
  const { handleClick, className, name } = props;
  return (
    <div className={styles.BorrowButtonWrapper}> 
      <button
      type="button"
      aria-label="Submit"
      //   onKeyDown={e => (e.key === "Enter" ? handleClick : null)}
      onClick={handleClick}
      className={styles.BorrowButton}
      //   className={cx(
      //     styles.IconRect,
      //     styles.SearchIcon,
      //     styles.IconButton,
      //     styles.DefaultSearchBoxColor,
      //     className!.map(c => styles[c])
      //   )}
      >{name}</button>
    </div>
  );
};

// BorrowButton.defaultProps = {
//   className: [""]
// };

export default BorrowButton;

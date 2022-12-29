import React from "react";
import cx from "classnames";
import styles from "./Arrow.module.css";

type ArrowProps = {
  className?: string[];
  handleClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
};

export const Arrow = ({ className = [""], handleClick }: ArrowProps) => {
  return (
    <button
      type="button"
      aria-label="Move"
      onClick={handleClick}
      className={cx(
        styles.IconButton,
        styles.ArrowRect,
        styles.Arrow,
        className!.map(c => styles[c])
      )}
    />
  );
};

export default Arrow;

import React from "react";
import cx from "classnames";
import styles from "./Arrow.module.css";

type ArrowProps = {
  className?: string[];
  handleClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
};

export const Arrow = (props: ArrowProps) => {
  const { handleClick, className } = props;

  return (
    <button
      type="button"
      aria-label="Move"
      onClick={handleClick}
      className={cx(
        styles.IconButton,
        styles.ArrorwRect,
        styles.Arrorw,
        className!.map(c => styles[c])
      )}
    />
  );
};

Arrow.defaultProps = {
  className: [""]
};

export default Arrow;

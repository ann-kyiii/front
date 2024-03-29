import React from "react";
import cx from "classnames";
import styles from "./SelectButton.module.css";

type SelectButtonProps = {
  isAbled: boolean;
  className?: string[];
  onClick: (e: React.MouseEvent<HTMLButtonElement>, nextLink: string) => void;
  text: string;
  nextLink: string;
};

export const SelectButton = ({
  isAbled,
  className = [""],
  onClick,
  text,
  nextLink
}: SelectButtonProps) => {
  return (
    <button
      type="button"
      className={cx(
        styles.SelectButton,
        className!.map(c => styles[c])
      )}
      onClick={e => onClick(e, nextLink)}
      disabled={!isAbled}
    >
      {text}
    </button>
  );
};

export default SelectButton;

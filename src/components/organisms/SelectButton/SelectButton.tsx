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

export const SelectButton = (props: SelectButtonProps) => {
  const { isAbled, className, onClick, text, nextLink } = props;

  return (
    <>
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
    </>
  );
};

SelectButton.defaultProps = {
  className: [""]
};

export default SelectButton;

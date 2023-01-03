import React from "react";
import styles from "./SearchToggleButton.module.css";

type SearchToggleButtonProps = {
  text: string;
  checked: boolean;
  handleChange: (event: React.InputHTMLAttributes<HTMLInputElement>) => void;
};

export const SearchToggleButton = ({
  text,
  checked,
  handleChange
}: SearchToggleButtonProps) => {
  return (
    <div className={styles.SearchToggleButtonWrapper}>
      <p className={styles.SearchToggleButtonText}>{text}</p>
      <input
        id="btn-mode"
        type="checkbox"
        className={styles.SearchToggleButtonInput}
        checked={!checked}
        onChange={handleChange}
      />
      <label htmlFor="btn-mode" className={styles.SearchToggleButtonLabel} />
    </div>
  );
};

export default SearchToggleButton;

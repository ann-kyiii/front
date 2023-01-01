import React from "react";
import styles from "./SearchToggleButton.module.css";

type SearchToggleButtonProps = {
  text: string;
  handleChange: (event: React.InputHTMLAttributes<HTMLInputElement>) => void;
};

export const SearchToggleButton = ({
  text,
  handleChange
}: SearchToggleButtonProps) => {
  return (
    <div className={styles.SearchToggleButtonWrapper}>
      <p className={styles.SearchToggleButtonText}>{text}</p>
      <input
        id="btn-mode"
        type="checkbox"
        className={styles.SearchToggleButtonInput}
        onChange={handleChange}
      />
      <label htmlFor="btn-mode" className={styles.SearchToggleButtonLabel} />
    </div>
  );
};

export default SearchToggleButton;

import React from "react";
import cx from "classnames";
import styles from "./SearchIcon.module.css";

type SearchIconProps = {
  className?: string[];
  handleClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
};

export const SearchIcon = ({
  className = [""],
  handleClick
}: SearchIconProps) => {
  return (
    <button
      type="button"
      aria-label="Submit"
      onKeyDown={e => (e.key === "Enter" ? handleClick : null)}
      onClick={handleClick}
      className={cx(
        styles.IconRect,
        styles.SearchIcon,
        styles.IconButton,
        styles.DefaultSearchBoxColor,
        className!.map(c => styles[c])
      )}
    />
  );
};

export default SearchIcon;

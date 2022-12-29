import React from "react";
import cx from "classnames";
import styles from "./PageNatior.module.css";

type PageNatiorProps = {
  totalPage: number;
  currentPage: number;
  handleClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
};

export const PageNatior = ({
  totalPage,
  currentPage,
  handleClick
}: PageNatiorProps) => {
  const innerPage = () => {
    const items = [];
    for (let idx = 1; idx <= totalPage; idx += 1) {
      items.push(
        <li key={idx}>
          <button
            type="button"
            tabIndex={0}
            onClick={handleClick}
            className={cx(styles.ListButton, {
              [styles.isSelected]: idx === currentPage
            })}
            value={idx}
            disabled={(() => idx === currentPage)()}
          >
            {idx}
          </button>
        </li>
      );
    }
    return <ul className={styles.PageNatiorULWrapper}>{items}</ul>;
  };

  return <div className={styles.PageNatiorWrapper}>{innerPage()}</div>;
};

export default PageNatior;

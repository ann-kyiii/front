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
    const limit = 5;
    let startPage;
    let endPage;
    if (currentPage <= Math.ceil(limit / 2)) {
      startPage = 1;
      endPage = limit;
    } else if (
      currentPage > Math.ceil(limit / 2) &&
      currentPage <= totalPage - Math.ceil(limit / 2) - 1
    ) {
      startPage = currentPage - Math.floor(limit / 2);
      endPage = currentPage + Math.ceil(limit / 2) - 1;
    } else {
      startPage = totalPage - limit + 1;
      endPage = totalPage;
    }
    if (totalPage < limit) {
      startPage = 1;
      endPage = totalPage;
    }

    if (currentPage > 1) {
      items.push(
        <li key={0}>
          <button
            type="button"
            tabIndex={0}
            onClick={handleClick}
            className={styles.ListButton}
            value={currentPage - 1}
          >
            {"<"}
          </button>
        </li>
      );
    }
    for (let idx = startPage; idx <= endPage; idx += 1) {
      items.push(
        <li key={idx}>
          <button
            type="button"
            tabIndex={0}
            onClick={handleClick}
            className={cx(styles.ListButton, {
              [styles.IsSelected]: idx === currentPage
            })}
            value={idx}
            disabled={(() => idx === currentPage)()}
          >
            {idx}
          </button>
        </li>
      );
    }
    if (currentPage < totalPage) {
      items.push(
        <li key={totalPage + 1}>
          <button
            type="button"
            tabIndex={0}
            onClick={handleClick}
            className={styles.ListButton}
            value={currentPage + 1}
          >
            {">"}
          </button>
        </li>
      );
    }
    return <ul className={styles.PageNatiorULWrapper}>{items}</ul>;
  };

  return <div className={styles.PageNatiorWrapper}>{innerPage()}</div>;
};

export default PageNatior;

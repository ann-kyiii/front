import React, { ReactNode } from "react";
import cx from "classnames";
import styles from "./PageNatior.module.css";

type PageNatiorProps = {
  totalPage: number;
  currentPage: number;
  handleClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
};

export const PageNatior = (props: PageNatiorProps) => {
  const { totalPage, currentPage, handleClick } = props;

  const innerPage = () => {
    const items = [];
    for (let idx = 0; idx < totalPage; idx += 1) {
      console.log();
    }
  };

  return (
    <div>PageNatior</div>
    // <div className={styles.PageNatiorWraper}>
    //   <ul className={styles.PageNatiorULWraper}>
    //     {emptyArray.map((un, index) => (
    //       <li key={index} className={styles.TagListWraper}>
    //         <button
    //           type="button"
    //           tabIndex={0}
    //           onClick={handleClick}
    //           className={cx(styles.ListButton, {
    //             [styles.isSelected]: index === currentPage
    //           })}
    //         >
    //           {index}
    //         </button>
    //       </li>
    //     ))}
    //   </ul>
    // </div>
  );
};

export default PageNatior;

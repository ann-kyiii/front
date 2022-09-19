import React, {
  // ReactNode
} from "react";
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
      // console.log("Hello");
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
            disabled={(() => idx === currentPage ? true : false)()}
            // key={idx}
          >
            {idx}
          </button>
        </li>
      )
    }
    return <ul className={styles.PageNatiorULWrapper}>{ items }</ul>;
  };

  const emptyArray: number[] = [1, 2, 3]; // エラー消すための仮

  return (
    // <div>PageNatior</div>
    <div className={styles.PageNatiorWrapper}>
      {/* <ul className={styles.PageNatiorULWrapper}>
        {emptyArray.map((un, index) => (
          // <li key={index} className={styles.TagListWraper}>
            // <button
            //   type="button"
            //   tabIndex={0}
            //   onClick={handleClick}
            //   className={cx(styles.ListButton, {
            //     [styles.isSelected]: index === currentPage
            //   })}
            //   key={index}
            // >
            //   {index}
            // </button>
          // </li>

        ))}
      </ul> */}
      {innerPage()}
    </div>
  );
};

export default PageNatior;

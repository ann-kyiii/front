import React, { Children } from "react";
import cx from "classnames";
import { useDispatch, useSelector } from "react-redux";
import { push } from "connected-react-router";
import { useModal } from "react-modal-hook";
import { AppProps } from "../../../App";
import styles from "./ReturnButton.module.css";

type ReturnButtonProps = AppProps & {
  className?: string[];
  buttonName: string;
  bookTitle: string;
  borrower: string;
};

export const ReturnButton = (props: ReturnButtonProps) => {
  const { className, buttonName, bookTitle, borrower } = props;
  const dispatch = useDispatch();

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const encode = encodeURI(`/book-lists`);
    dispatch(push(encode));
    props.history.push(encode);
  }

  // console.log(borrower);
  //TODO:onClickではサーバに送る
  const [showModal, hideModal] = useModal(() => (
    <div className={styles.wrapper}>
      <div role="dialog" className={styles.modal}>
        <div className={styles.title}>確認</div>
        <div className={styles.center}>
          <p>Book Title: {bookTitle}</p>
          <p>Borrower: {borrower}</p>
        </div>
        <div className={styles.ChooseButton}>
          <button onClick={hideModal}>DISAGREE</button>
          <button onClick={handleClick}>AGREE</button>
        </div>
      </div>
    </div>
  ), 
  [bookTitle, borrower]);

  return (
    <div className={styles.ReturnButtonWrapper}> 
      <button
      type="button"
      aria-label="Submit"
      //   onKeyDown={e => (e.key === "Enter" ? handleClick : null)}
      onClick={showModal}
      className={styles.ReturnButton}
      //   className={cx(
      //     styles.IconRect,
      //     styles.SearchIcon,
      //     styles.IconButton,
      //     styles.DefaultSearchBoxColor,
      //     className!.map(c => styles[c])
      //   )}
      >{buttonName}</button>
    </div>
  );
};

// BorrowButton.defaultProps = {
//   className: [""]
// };

export default ReturnButton;

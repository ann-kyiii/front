import React, { Children } from "react";
import { useDispatch, useSelector } from "react-redux";
import { push } from "connected-react-router";
import { useModal } from "react-modal-hook";
import { get } from "lodash";
import { AppProps } from "../../../App";
import styles from "./BorrowButton.module.css";
import fetchBookLists, {
  BookLists,
  BooksState
} from "../../../actions/resultlists";
import fetchBorrow from "../../../apis/fetchBorrow";

type BorrowButtonProps = AppProps & {
  className?: string[];
  buttonName: string;
  bookTitle: string;
  borrower: string;
  bookId: number;
};

export const BorrowButton = (props: BorrowButtonProps) => {
  const { className, buttonName, bookTitle, borrower, bookId } = props;
  const dispatch = useDispatch();

  const {
    isLoading,
    booksTable,
    booksIdList,
    statusCode,
    successedPageIndex, 
    maxBooks
  } = useSelector((state: BooksState) => get(state, ["books"]));

  // サーバにidと名前を送り，redux更新
  const sendBorrowerName = async () => {  
    const payload = {
      id: bookId.toString(),
      name: borrower,
    };
    try {
      dispatch(fetchBookLists.started({ pageIndex: 0 }));
      const response = await fetchBorrow(payload);
      // const response = await fetch("http://localhost:3000/dummyData.json");
      if (!response.ok) {
        dispatch(
          fetchBookLists.failed({
            params: { pageIndex: 0 },
            error: { statusCode: response.status }
          })
        );
        return;
      }
      const json = await response.json();
      const newData = {
        booksTable: { [json.id]: json },
        booksIdList: [] //ここでjson.idを追加してしまうと同じidが存在してしまう
      };
      console.log("#######################");
      console.log(newData);
      const result = { ...newData, maxBooks: maxBooks };
      dispatch(fetchBookLists.done({ params: { pageIndex: 0 }, result }));
    } catch (error) {
      console.log(`Error fetcing in getBookLists: ${error}`);
    }
  };

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    sendBorrowerName();
    const encode = encodeURI(`/book-detail/` + bookId);
    dispatch(push(encode));
    props.history.push(encode);
  }

  const [showModal, hideModal] = useModal(() => (
    <div className={styles.wrapper}>
      <div role="dialog" className={styles.modal}>
        <div className={styles.title}>確認</div>
        <div className={styles.center}>
          <p>Book Title: {bookTitle}</p>
          <p>Borrower  : {borrower}</p>
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
    <div className={styles.BorrowButtonWrapper}> 
      <button
        type="button"
        aria-label="Submit"
        onClick={borrower != "" ? showModal: undefined }
        className={styles.BorrowButton}
      >{buttonName}</button>
    </div>
  );
};

export default BorrowButton;

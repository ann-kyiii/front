import React, { Children } from "react";
import cx from "classnames";
import { useDispatch, useSelector } from "react-redux";
import { push } from "connected-react-router";
import { useModal } from "react-modal-hook";
import { AppProps } from "../../../App";
import { get } from "lodash";
import { normalize, schema } from "normalizr";
import fetchBookLists, {
  BookLists,
  BooksState
} from "../../../actions/resultlists";
import styles from "./ReturnButton.module.css";
import fetchReturn from "../../../apis/fetchReturn";

type ReturnButtonProps = AppProps & {
  className?: string[];
  buttonName: string;
  bookTitle: string;
  returner: string;
  bookId: number;
};

export const ReturnButton = (props: ReturnButtonProps) => {
  const { className, buttonName, bookTitle, returner, bookId } = props;
  const dispatch = useDispatch();

  const normalizeData = (
    data: BookLists
  ): Pick<BooksState, "booksTable" | "booksIdList"> => {
    const booksSchema = new schema.Entity("books", {}, { idAttribute: "id" });
    const booksTable = get(normalize(data, [booksSchema]), [
      "entities",
      "books"
    ]);
    const booksIdList = get(normalize(data, [booksSchema]), ["result"]);
    return { booksTable, booksIdList };
  };
  // サーバにidと名前を送り，redux更新
  const sendReturnerName = async () => {  
    const payload = {
      id: bookId,
      name: returner,
    };
    try {
      dispatch(fetchBookLists.started({ pageIndex: 0 }));
      const response = await fetchReturn(payload);
      // const response = await fetch("dummyData.json");
      // if (!response.ok) {
      //   dispatch(
      //     fetchBookLists.failed({
      //       params: { pageIndex: page },
      //       error: { statusCode: response.status }
      //     })
      //   );
      //   return;
      // }
      const json = await response.json();
      // APIのreturnが books: {} なので.
      const newData = normalizeData(json.books);
      const result = { ...newData, maxBooks: json.max_books };
      dispatch(fetchBookLists.done({ params: { pageIndex: 0 }, result }));
    } catch (error) {
      console.log(`Error fetcing in getBookLists: ${error}`);
    }
  };
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    sendReturnerName();
    const encode = encodeURI(`/book-detail/` + bookId);
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
          <p>Returner  : {returner}</p>
        </div>
        <div className={styles.ChooseButton}>
          <button onClick={hideModal}>DISAGREE</button>
          <button onClick={handleClick}>AGREE</button>
        </div>
      </div>
    </div>
  ), 
  [bookTitle, returner]);

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

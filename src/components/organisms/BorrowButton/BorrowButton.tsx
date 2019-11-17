import React, { Children } from "react";
import cx from "classnames";
import { useDispatch, useSelector } from "react-redux";
import { push } from "connected-react-router";
import { useModal } from "react-modal-hook";
import { get } from "lodash";
import { normalize, schema } from "normalizr";
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

  // const testJson = { books: [
  //   {
  //   ISBN:"9784061529014",
  //   author:"杉山将／著",
  //   bookName:"機械学習のための確率と統計",
  //   borrower: [],
  //   exist:"一部発見",
  //   find:3,
  //   genre:"研究(理論)",
  //   id:278,
  //   location:"unidentified",
  //   other:"なし",
  //   pubdate:"20150408",
  //   publisher:"講談社サイエンティフィク",
  //   subGenre:"統計・機械学習",
  //   sum:6,
  //   withDisc:"なし",
  //   },
  //   {
  //   ISBN:"9784061529021",
  //   author:"岡谷貴之／著",
  //   bookName:"深層学習",
  //   borrower: [],
  //   exist:"一部発見",
  //   find:1,
  //   genre:"研究(理論)",
  //   id:279,
  //   location:"unidentified",
  //   other:"なし",
  //   pubdate:"20150408",
  //   publisher:"講談社サイエンティフィク",
  //   subGenre:"ニューラルネットワーク",
  //   sum:2,
  //   withDisc:"なし",
  //   },
  //   ] }

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
  const sendBorrowerName = async () => {  
    const payload = {
      id: bookId,
      name: borrower,
    };
    try {
      dispatch(fetchBookLists.started({ pageIndex: 0 }));
      const response = await fetchBorrow(payload);
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
    sendBorrowerName();
    const encode = encodeURI(`/book-lists/` + bookId);
    dispatch(push(encode));
    props.history.push(encode);
  }

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
    <div className={styles.BorrowButtonWrapper}> 
      <button
      type="button"
      aria-label="Submit"
      //   onKeyDown={e => (e.key === "Enter" ? handleClick : null)}
      onClick={borrower != "" ? showModal: undefined }
      className={styles.BorrowButton}
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

export default BorrowButton;

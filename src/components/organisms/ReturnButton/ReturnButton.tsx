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

  const {
    isLoading,
    booksTable,
    booksIdList,
    statusCode,
    successedPageIndex, 
    maxBooks
  } = useSelector((state: BooksState) => get(state, ["books"]));


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
      id: bookId.toString(),
      name: returner,
    };
    try {
      dispatch(fetchBookLists.started({ pageIndex: 0 }));
      // const response = await fetchReturn(payload);
      const response = await fetch("http://localhost:3000/dummyData.json");
      // const response = await fetch("dummyData.json");
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
      // デバッグ用
      const testjson = {
        "book": [
          {
            "ISBN": "9784431100317",
            "author": "Bishop,ChristopherM／著 元田浩／翻訳 村田昇／著 松本裕治／著 ほか",
            "bookName": "パターン認識と機械学習 下",
            "borrower": ["testjson"],
            "exist": "一部発見",
            "find": 3,
            "genre": "研究(理論)",
            "id": 330,
            "imgURL": "https://cover.openbd.jp/9784431100317.jpg",
            "locateAt4F": false,
            "location": "unidentified",
            "other": "なし",
            "pubdate": "2008-07",
            "publisher": "シュプリンガー・ジャパン",
            "subGenre": "統計・機械学習",
            "sum": 1,
            "withDisc": "なし"
          }
        ],
      }      
      // APIのreturnが book: {} なので.
      const newData = normalizeData(testjson.book);
      const result = { ...newData, maxBooks: maxBooks };
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
      onClick={showModal}
      className={styles.ReturnButton}
      >{buttonName}</button>
    </div>
  );
};

// BorrowButton.defaultProps = {
//   className: [""]
// };

export default ReturnButton;

import React, { Children } from "react";
import { useDispatch, useSelector } from "react-redux";
import { push } from "connected-react-router";
import { useModal } from "react-modal-hook";
import { AppProps } from "../../../App";
import { get } from "lodash";
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

  // サーバにidと名前を送り，redux更新
  const sendReturnerName = async () => {  
    const payload = {
      id: bookId.toString(),
      name: returner,
    };
    try {
      dispatch(fetchBookLists.started({ pageIndex: 0 }));
      const response = await fetchReturn(payload);
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
        booksIdList: []
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
    sendReturnerName();
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

export default ReturnButton;

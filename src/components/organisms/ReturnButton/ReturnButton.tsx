import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { push } from "connected-react-router";
import { useModal } from "react-modal-hook";
import { get } from "lodash";
import { AppProps } from "../../../App";
import fetchBookLists, { BooksState } from "../../../actions/resultlists";
import styles from "./ReturnButton.module.css";
import fetchReturn from "../../../apis/fetchReturn";
import ModalWindow from "../../molecules/ModalWindow";

type ReturnButtonProps = AppProps & {
  buttonName: string;
  bookTitle: string;
  returner: string;
  bookId: number;
};

export const ReturnButton = (props: ReturnButtonProps) => {
  const { buttonName, bookTitle, returner, bookId } = props;
  const dispatch = useDispatch();

  const maxBooks = useSelector((state: BooksState) =>
    get(state, ["books", "maxBooks"])
  );

  // サーバにidと名前を送り，redux更新
  const sendReturnerName = async () => {
    const payload = {
      id: bookId.toString(),
      name: returner
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
      const result = { ...newData, maxBooks };
      dispatch(fetchBookLists.done({ params: { pageIndex: 0 }, result }));
    } catch (error) {
      console.log(`Error fetcing in getBookLists: ${error}`);
    }
  };
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    sendReturnerName();
    const encode = encodeURI(`/book-detail/${bookId}`);
    dispatch(push(encode));
    props.history.push(encode);
  };

  const [showModal, hideModal] = useModal(
    () => (
      <ModalWindow
        bookTitle={bookTitle}
        userType="Returner"
        user={returner}
        hideModal={hideModal}
        handleClick={handleClick}
      />
    ),
    [bookTitle, returner]
  );

  return (
    // <div className={styles.ReturnButtonWrapper}>
    <button
      type="button"
      aria-label="Submit"
      onClick={showModal}
      className={styles.ReturnButton}
    >
      {buttonName}
    </button>
    // </div>
  );
};

export default ReturnButton;

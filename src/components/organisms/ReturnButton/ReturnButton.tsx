import { useDispatch, useSelector } from "react-redux";
import { push } from "connected-react-router";
import { useModal } from "react-modal-hook";
import fetchBookLists, { BooksState } from "../../../actions/resultlists";
import styles from "./ReturnButton.module.css";
import fetchReturn from "../../../apis/fetchReturn";
import ModalWindow from "../../molecules/ModalWindow";

type ReturnButtonProps = {
  bookTitle: string;
  returner: string;
  bookId: number;
};

export const ReturnButton = ({
  bookTitle,
  returner,
  bookId
}: ReturnButtonProps) => {
  const dispatch = useDispatch();

  const maxBooks = useSelector((state: BooksState) => state.books.maxBooks);

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
      const result = { ...newData, maxBooks };
      dispatch(fetchBookLists.done({ params: { pageIndex: 0 }, result }));
    } catch (error) {
      console.log(`Error fetching in getBookLists: ${error}`);
    }
  };
  const handleClick = () => {
    sendReturnerName();
    const encode = encodeURI(`/book-detail/${bookId}`);
    dispatch(push(encode));
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
    <button
      type="button"
      aria-label="Submit"
      onClick={showModal}
      className={styles.ReturnButton}
    >
      {returner}
    </button>
  );
};

export default ReturnButton;

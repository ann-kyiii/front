import { useDispatch, useSelector } from "react-redux";
import { push } from "connected-react-router";
import { useModal } from "react-modal-hook";
import styles from "./BorrowButton.module.css";
import fetchBookLists, { BooksState } from "../../../actions/resultlists";
import fetchBorrow from "../../../apis/fetchBorrow";
import ModalWindow from "../../molecules/ModalWindow";

type BorrowButtonProps = {
  bookTitle: string;
  borrower: string;
  borrowerList: string[];
  bookId: number;
};

export const BorrowButton = ({
  bookTitle,
  borrower,
  borrowerList,
  bookId
}: BorrowButtonProps) => {
  const dispatch = useDispatch();

  const maxBooks = useSelector((state: BooksState) => state.books.maxBooks);

  // サーバにidと名前を送り，redux更新
  const sendBorrowerName = async () => {
    const payload = {
      id: bookId.toString(),
      name: borrower
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
        booksIdList: [] // ここでjson.idを追加してしまうと同じidが存在してしまう
      };
      const result = { ...newData, maxBooks };
      dispatch(fetchBookLists.done({ params: { pageIndex: 0 }, result }));
    } catch (error) {
      console.log(`Error fetching in getBookLists: ${error}`);
    }
  };
  const handleClick = () => {
    sendBorrowerName();
    const encode = encodeURI(`/book-detail/${bookId}`);
    dispatch(push(encode));
  };

  const [showModal, hideModal] = useModal(
    () => (
      <ModalWindow
        bookTitle={bookTitle}
        userType="Borrower"
        user={borrower}
        hideModal={hideModal}
        handleClick={handleClick}
      />
    ),
    [bookTitle, borrower]
  );

  return (
    <div className={styles.BorrowButtonWrapper}>
      <button
        type="button"
        aria-label="Submit"
        onClick={showModal}
        disabled={borrower === "" || borrowerList.includes(borrower)}
        className={styles.BorrowButton}
      >
        Borrow
      </button>
    </div>
  );
};

export default BorrowButton;

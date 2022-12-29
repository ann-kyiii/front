import React, { useState, useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ModalProvider } from "react-modal-hook";
import Header from "../organisms/Header";
import BookName from "../molecules/BookName";
import BorrowButton from "../organisms/BorrowButton";
import BorrowUserNameInput from "../molecules/BorrowUserNameInput";
import { RootState } from "../../reducers";
import fetchBookLists, { BooksState } from "../../actions/resultlists";
import fetchBookId from "../../apis/fetchBookId";
import LoadError from "../organisms/LoadError";

export const Borrow = () => {
  const [borrower, setBorrower] = useState<string>("");
  const dispatch = useDispatch();
  // URLからid取得
  const path: string = useSelector(
    (state: RootState) => state.router.location.pathname
  ).slice(1);
  const bookId = parseInt(path.split("/")[1], 10);
  const maxBooks = useSelector((state: BooksState) => state.books.maxBooks);
  const bookTitle = useSelector(
    (state: RootState) => state.books.booksTable[bookId]?.bookName
  );
  const borrowerList = useSelector(
    (state: RootState) => state.books.booksTable[bookId]?.borrower
  );

  // 1冊の情報だけ取得する
  const getOneBook = async () => {
    const payload = {
      id: bookId
    };
    try {
      dispatch(fetchBookLists.started({ pageIndex: 0 }));
      const response = await fetchBookId(payload);
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
        booksIdList: [json.id]
      };
      const result = { ...newData, maxBooks: 1 };
      dispatch(fetchBookLists.done({ params: { pageIndex: 0 }, result }));
    } catch (error) {
      console.log(`Error fetching in getBookLists: ${error}`);
    }
  };

  const handleOnChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setBorrower(e.target.value);
    },
    []
  );

  useEffect(() => {
    if (maxBooks === 0) {
      getOneBook();
    }
  }, []);

  if (bookTitle !== undefined) {
    return (
      <>
        <Header backLink={`/book-detail/${bookId}`} />
        <BookName>{bookTitle}</BookName>
        <BorrowUserNameInput
          placeValue="UserName"
          handleOnChange={handleOnChange}
        />
        <ModalProvider>
          <BorrowButton
            bookTitle={bookTitle}
            borrower={borrower}
            borrowerList={borrowerList}
            bookId={bookId}
          />
        </ModalProvider>
      </>
    );
  }
  return (
    <LoadError backLink="/" text="Failed to find the book" buttonName="Home" />
  );
};

export default Borrow;

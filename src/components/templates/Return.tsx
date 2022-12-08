import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { get } from "lodash";
import { ModalProvider } from "react-modal-hook";
import Header from "../organisms/Header";
import BookName from "../molecules/BookName";
import ReturnButton from "../organisms/ReturnButton";
import { RootState } from "../../reducers";
import fetchBookLists, { BooksState } from "../../actions/resultlists";
import fetchBookId from "../../apis/fetchBookId";
import styles from "./Return.module.css";
import LoadError from "../organisms/LoadError";

export const Return = () => {
  const dispatch = useDispatch();
  // URLからid取得
  const path: string = useSelector((state: RootState) =>
    get(state, ["router", "location", "pathname"])
  ).slice(1);
  const decode: string = decodeURI(path);
  const urlParams: string[] = decode.split("/");
  const bookId = parseInt(urlParams[1], 10);
  const maxBooks = useSelector((state: BooksState) =>
    get(state, ["books", "maxBooks"])
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
      console.log(json);

      const newData = {
        booksTable: { [json.id]: json },
        booksIdList: [json.id]
      };
      console.log("#######################");
      console.log(newData);
      const result = { ...newData, maxBooks: 1 };
      dispatch(fetchBookLists.done({ params: { pageIndex: 0 }, result }));
    } catch (error) {
      console.log(`Error fetcing in getBookLists: ${error}`);
    }
  };

  const bookTitle = useSelector((state: RootState) =>
    get(state, ["books", "booksTable", bookId, "bookName"])
  );

  const borrowerList: string[] = useSelector((state: RootState) =>
    get(state, ["books", "booksTable", bookId, "borrower"])
  );

  useEffect(() => {
    if (maxBooks === 0) {
      getOneBook();
      console.log("maxBooks === 0");
    } else {
      console.log("booksTable is defined");
    }
    // eslint-disable-next-line
  }, []);

  if (bookTitle !== undefined) {
    return (
      <>
        <Header backLink={`/book-detail/${bookId}`} />
        <BookName>{bookTitle}</BookName>
        <div className={styles.BorrowerWrapper}>Borrower</div>
        <ModalProvider>
          <div className={styles.ReturnButtonWrapper}>
            {borrowerList.map((name, index) => {
              return (
                <ReturnButton
                  key={index}
                  bookTitle={bookTitle}
                  returner={name}
                  bookId={bookId}
                />
              );
            })}
            ;
          </div>
        </ModalProvider>
      </>
    );
  }
  return (
    <LoadError backLink="/" text="Failed to find the book" buttonName="Home" />
  );
};

export default Return;

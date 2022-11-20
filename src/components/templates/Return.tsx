import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppProps } from "../../App";
import { RootState } from "../../reducers";
import { get } from "lodash";
import Header from "../organisms/Header";
import fetchBookLists, { BooksState } from "../../actions/resultlists";
import ReturnButton from "../organisms/ReturnButton"
import fetchBookId from "../../apis/fetchBookId";
import Full from "../../components/organisms/rena/Position/Full";
import styles from "./Return.module.css";
import { ModalProvider } from "react-modal-hook";
import BookName from "../molecules/BookName";

export const Return = ({ history }: AppProps) =>  {
  const dispatch = useDispatch();
  // URLからid取得
  const search: string = useSelector((state: RootState) =>
    get(state, ["router", "location", "pathname"])
  ).slice(1);
  const decode: string = decodeURI(search);
  const urlParams: string[] = decode.split("/");
  const bookId = parseInt(urlParams[1]);
  const maxBooks = useSelector((state: BooksState) => get(state, ["books", "maxBooks"]));

  //1冊の情報だけ取得する
  const getOneBook = async () => {
    const payload = {
      id: bookId,
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

  const list: string[] = useSelector((state: RootState) =>
    get(state, ["books", "booksTable", bookId, "borrower"])
  );

  const item = list !== undefined ? list.map((name, index) =>
    <ReturnButton key={index} history={history} buttonName={name} bookTitle={bookTitle} returner={name} bookId={bookId}/>
  ) : undefined;

  useEffect(() => {
    if(maxBooks === 0){
      getOneBook();
      console.log("maxBooks === 0");
    }else{
      console.log("booksTable is defined");
    }
  // eslint-disable-next-line
  }, []);

  if(bookTitle !== undefined){
    return (
      <>
        <Header history={history} backLink={"/book-detail/" + bookId} />
        <BookName>{bookTitle}</BookName>
        <div className={styles.BorrowerWrapper}>Borrower</div>
        <ModalProvider>
            <div className={styles.ReturnButtonWrapper}>
              {item}
            </div>
        </ModalProvider>
      </>
    );
  }else{
    return (
      <Full history={history} objKey="loadError"  backLink="/" text="Failed to find the book" buttonName="Home"/>
    );
  }
};

export default Return;

import React, {useState, useCallback, useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppProps } from "../../App";
import { RootState } from "../../reducers";
import { isEmpty, get } from "lodash";
import { normalize, schema } from "normalizr";
import Header from "../organisms/Header";
import fetchBookLists, {
  BookLists,
  BooksState
} from "../../actions/resultlists";
// import BookName from "../molecules/BookName"
import ReturnButton from "../organisms/ReturnButton"

import { ModalProvider, useModal } from "react-modal-hook";

export const Return = ({ history }: AppProps) =>  {
  // const bookTitle = "Book A"  //TODO:booklistからもらう必要
  const dispatch = useDispatch();
  // URLからid取得
  const search: string = useSelector((state: RootState) =>
    get(state, ["router", "location", "pathname"])
  ).slice(1);
  const decode: string = decodeURI(search);
  const urlParams: string[] = decode.split("/");
  const bookId = parseInt(urlParams[1]);
  const maxBooks = useSelector((state: BooksState) => get(state, ["books", "maxBooks"]));

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

  const getBookLists = async (page: number) => {
    try {
      dispatch(fetchBookLists.started({ pageIndex: page }));
      // const response = await fetchSearch(payload);
      const testJson = {
        "books": [
          {
            "ISBN": "9784274218026",
            "author": "伊庭斉志／著",
            "bookName": "進化計算と深層学習 創発する知能",
            "borrower": ["taro", "hanako"],
            "exist": "〇",
            "find": 3,
            "genre": "研究(理論)",
            "id": 309,
            "imgURL": "unidentified",
            "locateAt4F": false,
            "location": "unidentified",
            "other": "なし",
            "pubdate": "20151021",
            "publisher": "株式会社オーム社",
            "subGenre": "ニューラルネットワーク",
            "sum": 3,
            "withDisc": "なし"
          }
        ],
        "max_books": 1
      }
      // const response = await fetch("http://localhost:3000/dummyData.json");
      // if (!response.ok) {
      //   dispatch(
      //     fetchBookLists.failed({
      //       params: { pageIndex: page },
      //       error: { statusCode: response.status }
      //     })
      //   );
      //   return;
      // }
      // const json = await response.json();
      const json = testJson;
      // APIのreturnが books: {} なので.
      const newData = normalizeData(json.books);
      const result = { ...newData, maxBooks: json.max_books };
      dispatch(fetchBookLists.done({ params: { pageIndex: page }, result }));
    } catch (error) {
      console.log(`Error fetcing in getBookLists: ${error}`);
    }
  };

  const id = 280;
  //1冊の情報だけ取得する
  const getOneBook = async () => {
    const payload = {
      id: id,
    };
    try {
      dispatch(fetchBookLists.started({ pageIndex: 0 }));
      // const response = await fetchBookId(payload);
      const response = await fetch("http://localhost:3000/dummyData.json");
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

      // APIのreturnが books: {} なので.
      const newData = normalizeData(json.books);
      console.log(newData);
      const result = { ...newData, maxBooks: json.max_books };
      dispatch(fetchBookLists.done({ params: { pageIndex: 0 }, result }));
    } catch (error) {
      console.log(`Error fetcing in getBookLists: ${error}`);
    }
  };


  const bookTitle = useSelector((state: RootState) =>
    get(state, ["books", "booksTable", bookId, "bookName"])
  );


  // const list: string[] = ["hanako", "taro", "ynu"];
  const list: string[] = useSelector((state: RootState) =>
    get(state, ["books", "booksTable", bookId, "borrower"])
  );

  const item = list != undefined ? list.map((name, index) => 
    <ReturnButton key={index} history={history} buttonName={name} bookTitle={bookTitle} returner={name} bookId={bookId}/>
  ) : undefined;
  
  useEffect(() => {
    if(maxBooks == 0){
      getBookLists(0);
      console.log("maxBooks == 0");

    // getOneBook();
    }else{
      console.log("booksTable is not undefined");
    }
  }, []);

  if(bookTitle != undefined){
    return (
      <>
        <Header history={history} backLink="/" />
        <div style={{textAlign: "center", height: "70px", fontSize: "18px"}}>{bookTitle}</div>
        <div style={{textAlign: "center", fontSize: "larger"}}>Borrower</div>
        <ModalProvider>
            {item}
        </ModalProvider>
      </>
    );
  }else{
    return (
      <div>error</div>
    );
  }
};

export default Return;

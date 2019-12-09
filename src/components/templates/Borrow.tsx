import React, {useState, useCallback, useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppProps } from "../../App";
import { push } from "connected-react-router";
import Header from "../organisms/Header";
import BookName from "../molecules/BookName"
import BorrowButton from "../organisms/BorrowButton"
import BorrowUserNameInput from "../molecules/BorrowUserNameInput"
import { RootState } from "../../reducers";
import { isEmpty, get } from "lodash";
import { normalize, schema } from "normalizr";
import fetchBookLists, {
  BookLists,
  BooksState
} from "../../actions/resultlists";
import fetchBookId from "../../apis/fetchBookId";
import { ModalProvider, useModal } from "react-modal-hook";

export const Borrow = ({ history }: AppProps) =>  {
  const [borrower, setBorrower] = useState<string>("");
    // URLからid取得
  const search: string = useSelector((state: RootState) =>
    get(state, ["router", "location", "pathname"])
  ).slice(1);
  const decode: string = decodeURI(search);
  const urlParams: string[] = decode.split("/");
  const bookId = parseInt(urlParams[1]);
  const maxBooks = useSelector((state: BooksState) => get(state, ["books", "maxBooks"]));
  const dispatch = useDispatch();
  

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

  //Debug
  const getBookLists = async (page: number) => {
    try {
      dispatch(fetchBookLists.started({ pageIndex: page }));
      // const response = await fetchSearch(payload);
      const response = await fetch("http://localhost:3000/dummyData.json");
      if (!response.ok) {
        dispatch(
          fetchBookLists.failed({
            params: { pageIndex: page },
            error: { statusCode: response.status }
          })
        );
        return;
      }
      const json = await response.json();
      const testjson = {
        "book": [
          {
            "ISBN": "9784274218026",
            "author": "伊庭斉志／著",
            "bookName": "進化計算と深層学習 創発する知能",
            "borrower": ["testJson"],
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
      }
      // APIのreturnが books: {} なので.
      const newData = normalizeData(json.books);
      console.log(newData);
      const result = { ...newData, maxBooks: json.max_books };
      dispatch(fetchBookLists.done({ params: { pageIndex: page }, result }));
    } catch (error) {
      console.log(`Error fetcing in getBookLists: ${error}`);
    }
  };

  //1冊の情報だけ取得する
  const getOneBook = async () => {
    const payload = {
      id: bookId,
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
      // const json = await response.json();
      const json = {
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
      console.log(json);

      // APIのreturnが books: {} なので.
      const newData = normalizeData(json.book);
      console.log(newData);
      const result = { ...newData, maxBooks: maxBooks };
      dispatch(fetchBookLists.done({ params: { pageIndex: 0 }, result }));
    } catch (error) {
      console.log(`Error fetcing in getBookLists: ${error}`);
    }
  };


  const bookTitle = useSelector((state: RootState) =>
    get(state, ["books", "booksTable", bookId, "bookName"])
  );

  // console.log(bookTitle);
  // if(bookTitle == undefined){
  //   console.log("bookTitle == undefined");
  // }

  // const bookTitle = book;

  useEffect(() => {
    if(maxBooks == 0){
      // getBookLists(0);
      getOneBook();
      console.log("maxBooks == 0");
    // getOneBook();
    }else{
      console.log("booksTable is defined");
    }
    // getOneBook()
  }, []);

  const handleOnChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setBorrower(e.target.value);
    },
    []
  );

  //Debug
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    getOneBook();
  }
  
  if(bookTitle != undefined){
    return (
      <>
        <Header history={history} backLink="/" />
        <BookName>{bookTitle}</BookName>
        <BorrowUserNameInput placeValue="UserName" handleOnChange={handleOnChange}/>
        <ModalProvider>
          <BorrowButton history={history} buttonName="Borrow" bookTitle={bookTitle} borrower={borrower} bookId={bookId}/>
        </ModalProvider>

        {/* <button onClick={handleClick}>get 280</button> */}
      </>
      );
    }else{
      return (
        <div>error</div>
      );
  }
};

export default Borrow;

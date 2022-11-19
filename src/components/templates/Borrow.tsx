import React, {useState, useCallback, useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppProps } from "../../App";
import Header from "../organisms/Header";
import BookName from "../molecules/BookName"
import BorrowButton from "../organisms/BorrowButton"
import BorrowUserNameInput from "../molecules/BorrowUserNameInput"
import { RootState } from "../../reducers";
import {
  // isEmpty,
  get
} from "lodash";
// import { normalize, schema } from "normalizr";
import fetchBookLists, {
  // BookLists,
  BooksState
} from "../../actions/resultlists";
import fetchBookId from "../../apis/fetchBookId";
import {
  ModalProvider,
  // useModal
} from "react-modal-hook";
import Full from "../../components/organisms/rena/Position/Full";

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


  // const normalizeData = (
  //   data: BookLists
  // ): Pick<BooksState, "booksTable" | "booksIdList"> => {
  //   const booksSchema = new schema.Entity("books", {}, { idAttribute: "id" });
  //   const booksTable = get(normalize(data, [booksSchema]), [
  //     "entities",
  //     "books"
  //   ]);
  //   const booksIdList = get(normalize(data, [booksSchema]), ["result"]);
  //   return { booksTable, booksIdList };
  // };

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
      // const json = {
      //   ISBN: "9784431100317",
      //   author:
      //     "Bishop,ChristopherM／著 元田浩／翻訳 村田昇／著 松本裕治／著 ほか",
      //   bookName: "パターン認識と機械学習 下",
      //   borrower: ["testjson"],
      //   exist: "一部発見",
      //   find: 3,
      //   genre: "研究(理論)",
      //   id: 330,
      //   imgURL: "https://cover.openbd.jp/9784431100317.jpg",
      //   locateAt4F: false,
      //   location: "unidentified",
      //   other: "なし",
      //   pubdate: "2008-07",
      //   publisher: "シュプリンガー・ジャパン",
      //   subGenre: "統計・機械学習",
      //   sum: 1,
      //   withDisc: "なし"
      // };
      console.log(json);

      const newData = {
        booksTable: { [json.id]: json },
        booksIdList: [json.id]
      };
      console.log("#######################");
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

  useEffect(() => {
    if(maxBooks === 0){
      getOneBook();
      console.log("maxBooks === 0");
    }else{
      console.log("booksTable is defined");
    }
  // eslint-disable-next-line
  }, []);

  const handleOnChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setBorrower(e.target.value);
    },
    []
  );

  if(bookTitle !== undefined){
    return (
      <>
        <Header history={history} backLink={"/book-detail/" + bookId} />
        <BookName>{bookTitle}</BookName>
        <BorrowUserNameInput placeValue="UserName" handleOnChange={handleOnChange}/>
        <ModalProvider>
          <BorrowButton history={history} buttonName="Borrow" bookTitle={bookTitle} borrower={borrower} bookId={bookId}/>
        </ModalProvider>
      </>
      );
    }else{
      return (
        <Full history={history} objKey="loadError"  backLink="/" text="Failed to find the book" buttonName="Home"/>
      );
  }
};

export default Borrow;

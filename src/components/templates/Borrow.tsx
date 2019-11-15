import React, {useState, useCallback} from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppProps } from "../../App";
import Header from "../organisms/Header";
import SearchBox from "../atoms/SearchBox";
import BookName from "../molecules/BookName"
// import PopupWindow from "../molecules/PopupWindow"
import SearchIcon from "../atoms/SearchIcon"
import BorrowButton from "../organisms/BorrowButton"
import BorrowUserNameInput from "../molecules/BorrowUserNameInput"
import { RootState } from "../../reducers";
import { isEmpty, get } from "lodash";
import fetchBookLists, {
  BookLists,
  SavedBooks
} from "../../actions/resultlists";
import { normalize, schema } from "normalizr";

import { ModalProvider, useModal } from "react-modal-hook";
// import Dialog from "../molecules/Dialog"

export const Borrow = ({ history }: AppProps) =>  {
  const [borrower, setBorrower] = useState<string>("");
  const dispatch = useDispatch();
  // const book = useSelector((state: RootState) =>
  //   get(state, ["bookLists", "bookTable", "278"])
  // );
  // const book = useSelector((state: RootState) => state.bookLists);

  const testJson = { books: [
    {
    ISBN:"9784061529014",
    author:"杉山将／著",
    bookName:"機械学習のための確率と統計",
    borrower: [],
    exist:"一部発見",
    find:3,
    genre:"研究(理論)",
    id:278,
    location:"unidentified",
    other:"なし",
    pubdate:"20150408",
    publisher:"講談社サイエンティフィク",
    subGenre:"統計・機械学習",
    sum:6,
    withDisc:"なし",
    },
    {
    ISBN:"9784061529021",
    author:"岡谷貴之／著",
    bookName:"深層学習",
    borrower: [],
    exist:"一部発見",
    find:1,
    genre:"研究(理論)",
    id:279,
    location:"unidentified",
    other:"なし",
    pubdate:"20150408",
    publisher:"講談社サイエンティフィク",
    subGenre:"ニューラルネットワーク",
    sum:2,
    withDisc:"なし",
    },
    ] }
    const normalizeData = (data: BookLists): SavedBooks => {
      const booksSchema = new schema.Entity("books", {}, { idAttribute: "id" });
      const booksTable = get(normalize(data, [booksSchema]), [
        "entities",
        "books"
      ]);
      const booksIdList = get(normalize(data, [booksSchema]), ["result"]);
      return { booksTable, booksIdList };
    };
    const newData = normalizeData(testJson.books);
    const dis = async () => {
      dispatch(fetchBookLists.started());
      dispatch(fetchBookLists.done({ result: newData }));
    };
    dis();
  // const bookTitle = "Book A"  //TODO:booklistからもらう必要
  // const book = useSelector((state: RootState) => state.bookLists);
  // const bookTitle = book[0].bookName;
  const book = useSelector((state: RootState) =>
    get(state, ["bookLists", "booksTable", "278", "bookName"])
  );
  // console.log(book);
  // console.log(path);
  // const bookTitle = book.bookName;
  // const bookTitle = testJson.books[0].bookName
  const bookTitle = book;

  // const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
  //   // console.log("test");
  //   console.log(inputValue);
  //   console.log("window表示");
    
  //   // return (
  //   // <ModalProvider>
  //   //   <Dialog />
  //   // </ModalProvider>
  //   // );
  // };

  const handleOnChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setBorrower(e.target.value);
    },
    []
  );

  return (
    <>
      <Header history={history} backLink="/" />
      {/* <div>BorrowBookName</div> */}
      <BookName>{bookTitle}</BookName>
      {/* <div>Username form</div> */}
      {/* <PopupWindow></PopupWindow> */}
      {/* <SearchBox></SearchBox> */}
      {/* <input  placeholder="UserName" /> */}
      <BorrowUserNameInput placeValue="UserName" handleOnChange={handleOnChange}/>
      {/* <button onClick={handleClick}>Borrow</button> */}
      <ModalProvider>
        <BorrowButton history={history} buttonName="Borrow" bookTitle={bookTitle} borrower={borrower}/>
      </ModalProvider>
      {/* <SearchIcon handleClick={handleClick} /> */}
      {/* <div>Borrow Button</div> */}
      {/* <ModalProvider>
        <Dialog />
      </ModalProvider> */}
    </>
  );
};

export default Borrow;

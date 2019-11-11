import React, {useState, useCallback} from "react";
import { AppProps } from "../../App";
import Header from "../organisms/Header";
import SearchBox from "../atoms/SearchBox";
import BookName from "../molecules/BookName"
// import PopupWindow from "../molecules/PopupWindow"
import SearchIcon from "../atoms/SearchIcon"
import BorrowButton from "../molecules/BorrowButton"
import BorrowUserNameInput from "../molecules/BorrowUserNameInput"

import { ModalProvider, useModal } from "react-modal-hook";
// import Dialog from "../molecules/Dialog"

export const Borrow = ({ history }: AppProps) =>  {
  const [borrower, setBorrower] = useState<string>("");
  const bookTitle = "Book A"  //TODO:booklistからもらう必要

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

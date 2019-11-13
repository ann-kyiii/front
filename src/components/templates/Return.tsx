import React, {useState, useCallback} from "react";
import { AppProps } from "../../App";
import Header from "../organisms/Header";
import SearchBox from "../atoms/SearchBox";
// import BookName from "../molecules/BookName"
// import PopupWindow from "../molecules/PopupWindow"
import SearchIcon from "../atoms/SearchIcon"
import ReturnButton from "../molecules/ReturnButton"
// import ReturnUserNameInput from "../molecules/ReturnUserNameInput"

import { ModalProvider, useModal } from "react-modal-hook";
// import Dialog from "../molecules/Dialog"

export const Return = ({ history }: AppProps) =>  {
  const [borrower, setBorrower] = useState<string>("");
  const bookTitle = "Book A"  //TODO:booklistからもらう必要
  const list = ["hanako", "taro"];

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

  const item = list.map((name) => 
  <ReturnButton history={history} buttonName={name} bookTitle={bookTitle} borrower={name}/>
  );

  return (
    <>
      <Header history={history} backLink="/" />
      {/* <div>BorrowBookName</div> */}
      {/* <BookName>{bookTitle}</BookName> */}
      <div>{bookTitle}</div>
      {/* <div>Username form</div> */}
      {/* <PopupWindow></PopupWindow> */}
      {/* <SearchBox></SearchBox> */}
      {/* <input  placeholder="UserName" /> */}
      <div>Borrower</div>
      {/* <button onClick={handleClick}>Borrow</button> */}
      <ModalProvider>
        {/* list.map((name) => 
          <ReturnButton history={history} buttonName="Return" bookTitle={bookTitle} borrower={name}/>
        ); */}
        {/* <div style={{display: "flex", justifyContent: "center", margin: 20}}> */}
          {item}
        {/* </div> */}
      </ModalProvider>
      {/* <SearchIcon handleClick={handleClick} /> */}
      {/* <div>Return Button</div> */}
      {/* <ModalProvider>
        <Dialog />
      </ModalProvider> */}
    </>
  );
};

export default Return;

import React, {useState, useCallback} from "react";
import { AppProps } from "../../App";
import Header from "../organisms/Header";
import SearchBox from "../atoms/SearchBox";
import BookName from "../molecules/BookName"
// import PopupWindow from "../molecules/PopupWindow"
import SearchIcon from "../atoms/SearchIcon"
import BorrowButton from "../molecules/BorrowButton"
import BorrowUserNameInput from "../molecules/BorrowUserNameInput"

export const Borrow = ({ history }: AppProps) =>  {
  const [inputValue, setInputValue] = useState<string>("");

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    // console.log("test");
    console.log(inputValue);
    
  };

  const handleOnChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setInputValue(e.target.value);
    },
    []
  );

  return (
    <>
      <Header history={history} backLink="/" />
      {/* <div>BorrowBookName</div> */}
      <BookName>Book A</BookName>
      {/* <div>Username form</div> */}
      {/* <PopupWindow></PopupWindow> */}
      {/* <SearchBox></SearchBox> */}
      {/* <input  placeholder="UserName" /> */}
      <BorrowUserNameInput placeValue="UserName" handleOnChange={handleOnChange}/>
      {/* <button onClick={handleClick}>Borrow</button> */}
      <BorrowButton handleClick={handleClick} name="borrow!" />
      {/* <SearchIcon handleClick={handleClick} /> */}
      {/* <div>Borrow Button</div> */}
    </>
  );
};

export default Borrow;

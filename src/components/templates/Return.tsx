import React, {useState, useCallback, useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppProps } from "../../App";
import { RootState } from "../../reducers";
import Header from "../organisms/Header";
// import BookName from "../molecules/BookName"
import ReturnButton from "../organisms/ReturnButton"

import { ModalProvider, useModal } from "react-modal-hook";

export const Return = ({ history }: AppProps) =>  {
  const bookTitle = "Book A"  //TODO:booklistからもらう必要
  const dispatch = useDispatch();
  const test: string = "test";
  // dispatch(test);
  // const bookTitle = useSelector((state: RootState) => state.str).toString();
  const list = ["hanako", "taro", "ynu"];

  const item = list.map((name, index) => 
  <ReturnButton key={index} history={history} buttonName={name} bookTitle={bookTitle} Returner={name}/>
  );

  useEffect(() => {
    console.log("useEffect");
  }, []);

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
};

export default Return;

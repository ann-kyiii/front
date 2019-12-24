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
import ReturnButton from "../organisms/ReturnButton"
import fetchBookId from "../../apis/fetchBookId";
import Full from "../../components/organisms/rena/Position/Full";

import { ModalProvider, useModal } from "react-modal-hook";

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

  // const list: string[] = ["hanako", "taro", "ynu"];
  const list: string[] = useSelector((state: RootState) =>
    get(state, ["books", "booksTable", bookId, "borrower"])
  );

  const item = list != undefined ? list.map((name, index) => 
    <ReturnButton key={index} history={history} buttonName={name} bookTitle={bookTitle} returner={name} bookId={bookId}/>
  ) : undefined;
  
  useEffect(() => {
    if(maxBooks == 0){
      getOneBook();
      console.log("maxBooks == 0");
    }else{
      console.log("booksTable is defined");
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
      <Full history={history} objKey="loadError"  backLink="/" text="Failed to find the book" buttonName="Home"/>
    );
  }
};

export default Return;

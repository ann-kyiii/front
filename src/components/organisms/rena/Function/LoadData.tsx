import React, { useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { push } from "connected-react-router";
import { AppProps } from "../../../../App";
import { RootState } from "../../../../reducers";
import { isEmpty, get } from "lodash";
import { normalize, schema } from "normalizr";
import fetchBookLists, {
  BookLists,
  BooksState
} from "../../../../actions/resultlists";

type Props = AppProps&{
  bookID: number;
  dummy: boolean;
};

export const LoadData = (props: Props) => {
 
  const {history, bookID, dummy} = props;
 
  // function
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

  const dispatch = useDispatch();
        
  
  // dummy data を reduxに
  if (dummy){

    const page = 1; 
    dispatch(fetchBookLists.started({ pageIndex: page }));
    
    // ダミーデータ追加分
    const json = { books: [
      {
        "ISBN": "9784274218026",
        "author": "伊庭斉志／著",
        "bookName": "進化計算と深層学習 創発する知能",
        "borrower": [],
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
      },
      {
        "ISBN": "9784061529243",
        "author": "坪井祐太／著 海野裕也／著 鈴木潤／著",
        "bookName": "深層学習による自然言語処理",
        "borrower": [],
        "exist": "一部発見",
        "find": 1,
        "genre": "研究(応用)",
        "id": 395,
        "imgURL": "https:\\/\\/cover.openbd.jp\\/9784061529243.jpg",
        "locateAt4F": false,
        "location": "unidentified",
        "other": "なし",
        "pubdate": "20170525",
        "publisher": "講談社サイエンティフィク",
        "subGenre": "自然言語処理",
        "sum": 2,
        "withDisc": "なし"
      }
    ], }

    
    // storeに格納
    const newData = normalizeData(json.books);
    // dispatch(fetchBookLists.done({ result: newData }));
    const result = { ...newData, maxBooks: 2 };
    // const result = { ...newData, maxBooks: json.max_books };
    dispatch(fetchBookLists.done({ params: { pageIndex: page }, result }));
  }

  return true;

};

export default LoadData;


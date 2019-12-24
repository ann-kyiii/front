import React, { useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { push } from "connected-react-router";
import { AppProps } from "../../../../App";
import { RootState } from "../../../../reducers";
import { isEmpty, get } from "lodash";
import { normalize, schema } from "normalizr";
import fetchBookLists, {
  BookLists,
  BooksState,
} from "../../../../actions/resultlists";
import { type } from "os";

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

  if (bookID<0){
    return;
  }

  console.log(process.env.REACT_APP_DEV_HOST);
        
  if (dummy){
    // fetch('http://localhost:3000/dummyData.json')
    fetch(process.env.REACT_APP_DEV_HOST+"/dummyData.json")
    .then(function(response) {
      return response.json();
    })
    .then(function(json) {
      console.log(json);
      const page = 1;
      dispatch(fetchBookLists.started({ pageIndex: page }));
      const newData = normalizeData(json.books);   
      console.log(newData);  
      const result = { ...newData, maxBooks: json.max_books };
      dispatch(fetchBookLists.done({ params: { pageIndex: page }, result }));
    });
  }else{
    // fetch("http://34.82.110.129:1313/api/v1/bookId/"+bookID)
    fetch(process.env.REACT_APP_API_HOST+"/bookId/"+bookID)
    .then(function(response) {
      return response.json();
    })
    .then(function(pre_json) {    
      type BookInfo = {
        id: number;
        bookName: string;
        genre: string;
        subGenre: string;
        ISBN: string;
        find: number;
        sum: number;
        author: string;
        publisher: string;
        pubdate: string;
        exist: string;
        locateAt4F?: boolean;
        withDisc: string;
        other: string;
        borrower: string[];
        location: string;
      };
      const pre_json2 : BookInfo = pre_json;
      const json = {books:pre_json2, max_books:1};
      const page = 0;
      dispatch(fetchBookLists.started({ pageIndex: page })); 
      const newData = normalizeData([json.books]);   
      const result = { ...newData, maxBooks: json.max_books };
      dispatch(fetchBookLists.done({ params: { pageIndex: page }, result }));
    });

  }

  return true;

};

export default LoadData;


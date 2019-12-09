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
        
  if (dummy){
    // fetch('http://localhost:3000/dummyData.json')
    fetch(process.env.REACT_APP_DEV_HOST+"/dummyData.json")
    .then(function(response) {
      return response.json();
    })
    .then(function(json) {
      const page = 0;
      dispatch(fetchBookLists.started({ pageIndex: page }));
      const newData = normalizeData(json.books);     
      const result = { ...newData, maxBooks: json.max_books };
      dispatch(fetchBookLists.done({ params: { pageIndex: page }, result }));
    });
  }else{
    console.log("not dummy 後で考える");

    // console.log(process.env.REACT_APP_API_HOST);
    // fetch(`http://34.82.110.129:1313/api/v1/bookID/1`, {method: "GET"})
    // .then(function(response) {
    //   console.log(response.json());
    // });
  
    // const data = ; 
    // console.log(fetch(`http://34.82.110.129:1313/api/v1/bookID/30`, {method: "GET"}));

  }

  return true;

};

export default LoadData;


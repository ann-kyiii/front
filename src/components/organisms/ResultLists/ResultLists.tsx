import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { get } from "lodash";
import { normalize, schema } from "normalizr";
import { AppProps } from "../../../App";
import { RootState } from "../../../reducers";
import fetchBookLists, {
  BookLists,
  BooksState
} from "../../../actions/resultlists";
import PageNatior from "../../molecules/PageNatior";
import fetchSearch from "../../../apis/fetchSearch";
import { push } from "connected-react-router";

type ResultListsProps = AppProps & {};

export const ResultLists = (props: ResultListsProps) => {
  // init: ページ情報取得
  const search: string = useSelector((state: RootState) =>
    get(state, ["router", "location", "search"])
  ).slice(1);
  const decode: string = decodeURI(search);
  const urlParams: string[] = decode.split(/&/g);
  const keyWords: string[] = urlParams
    .filter(param => param.startsWith("key="))
    .map(param => param.replace(/^key=/g, ""));

  const pageIndex: number =
    parseInt(
      urlParams
        .filter(param => param.startsWith("page="))
        .map(param => param.replace(/^page=/g, ""))
        .slice(-1)
        .toString(),
      10
    ) || 0;

  // process: データ関係の処理

  // ページに関わる変数をReduxから取得
  const {
    isLoading,
    booksTable,
    booksIdList,
    statusCode,
    successedPageIndex
  } = useSelector((state: BooksState) => get(state, ["books"]));
  const dispatch = useDispatch();

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

  const getBookLists = async (page: number) => {
    if (successedPageIndex.includes(page)) {
      return;
    }

    const limit = 10;
    const offset = page * limit;
    const payload = {
      keywords: keyWords,
      offset: offset.toString(),
      limit: limit.toString()
    };
    try {
      dispatch(fetchBookLists.started({ pageIndex: page }));
      // const response = await fetchSearch(payload);
      const response = await fetch("dummyData.json");
      if (!response.ok) {
        dispatch(
          fetchBookLists.failed({
            params: { pageIndex: page },
            error: { statusCode: response.status }
          })
        );
        return;
      }
      const json = await response.json();
      // APIのreturnが books: {} なので.
      const newData = normalizeData(json.books);
      const result = { ...newData, maxBooks: json.max_books };
      dispatch(fetchBookLists.done({ params: { pageIndex: page }, result }));
    } catch (error) {
      console.log(`Error fetcing in getBookLists: ${error}`);
    }
  };

  useEffect(() => {
    getBookLists(pageIndex);
  }, [pageIndex]);

  const handleClick = (pageIndex: any) => {
    const encode = `book-lists?key=%E6%B7%B1%E5%B1%A4%E5%AD%A6%E7%BF%92&key=%E6%A9%9F%E6%A2%B0%E5%AD%A6%E7%BF%92&page=${pageIndex +
      1}`;
    dispatch(push(encode));
    props.history.push(encode);
  };

  return (
    <>
      {/* <PageNatior
        totalPage={100}
        currentPage={0}
        handleClick={() => console.log("Hello")}
      /> */}
      <button onClick={() => handleClick(pageIndex)}>BUTTON</button>
    </>
  );
};

export default ResultLists;

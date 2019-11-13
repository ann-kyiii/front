import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { get } from "lodash";
import { normalize, schema } from "normalizr";
import { AppProps } from "../../../App";
import { RootState } from "../../../reducers";
import fetchBookLists, {
  BookLists,
  SavedBooks
} from "../../../actions/resultlists";
import PageNatior from "../../molecules/PageNatior";
import fetchSearch from "../../../apis/fetchSearch";

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
  const dispatch = useDispatch();

  const normalizeData = (data: BookLists): SavedBooks => {
    const booksSchema = new schema.Entity("books", {}, { idAttribute: "id" });
    const booksTable = get(normalize(data, [booksSchema]), [
      "entities",
      "books"
    ]);
    const booksIdList = get(normalize(data, [booksSchema]), ["result"]);
    return { booksTable, booksIdList };
  };

  const getBookLists = async (page: number) => {
    const limit = 10;
    const offset = page * limit;
    const payload = {
      keywords: keyWords,
      offset: offset.toString(),
      limit: limit.toString()
    };
    try {
      dispatch(fetchBookLists.started());
      const response = await fetchSearch(payload);
      if (!response.ok) {
        dispatch(
          fetchBookLists.failed({ error: { statusCode: response.status } })
        );
        return;
      }
      const json = await response.json();
      // APIのreturnが books: {} なので.
      const newData = normalizeData(json.books);
      dispatch(fetchBookLists.done({ result: newData }));
    } catch (error) {
      console.log(`Error fetcing in getBookLists: ${error}`);
    }
  };

  useEffect(() => {
    getBookLists(pageIndex);
  }, [keyWords, pageIndex]);

  const { isLoading, booksTable, booksIdList } = useSelector(
    (state: SavedBooks) => get(state, ["bookLists"])
  );

  return (
    <>
      {/* <PageNatior
        totalPage={100}
        currentPage={0}
        handleClick={() => console.log("Hello")}
      /> */}
    </>
  );
};

export default ResultLists;

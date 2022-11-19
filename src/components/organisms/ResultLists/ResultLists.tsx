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
import ResultBook from "../../molecules/ResultBook";
import styles from "./ResultLists.module.css";

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
    ) || 1;

  // process: データ関係の処理
  // ページに関わる変数をReduxから取得
  const {
    isLoading,
    storedBooksTable,
    storedBooksIdList,
    statusCode,
    successedPageIndex
  } = useSelector((state: BooksState) => get(state, ["books"]));
  // 使うものだけ取ってくる形だとundefinedではなく[]とかになる
  // const storedBooksTable = useSelector((state: BooksState) => get(state, ["books", "booksTable"]))
  // const storedBooksIdList = useSelector((state: BooksState) => get(state, ["books", "booksIdList"]));
  const dispatch = useDispatch();
  const [books, setBooks] = useState({booksTable: storedBooksTable, booksIdList: storedBooksIdList, maxBooks: 0});

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

  const limit = 10;
  const getBookLists = async (page: number) => {
    if (pageIndex <= 0) {
      return
    }

    const offset = (page - 1) * limit;
    const payload = {
      keywords: keyWords,
      offset: offset.toString(),
      limit: limit.toString()
    };
    try {
      dispatch(fetchBookLists.started({ pageIndex: page }));
      const response = await fetchSearch(payload);
      // const response = await fetch("dummyData.json");
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
      setBooks({booksTable: result.booksTable, booksIdList: result.booksIdList, maxBooks: result.maxBooks});
      dispatch(fetchBookLists.done({ params: { pageIndex: page }, result }));
    } catch (error) {
      console.log(`Error fetcing in getBookLists: ${error}`);
    }
  };

  useEffect(() => {
    getBookLists(pageIndex);
  // eslint-disable-next-line
  }, [pageIndex]);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>, pageIndex: any) => {
    const encode = `book-lists?${search.replace(`page=${pageIndex}`, `page=${e.currentTarget.value}`)}`;
    dispatch(push(encode));
    props.history.push(encode);
    // ページ上部に戻す
    window.scrollTo(0, 0);
  };

  if (books.booksIdList !== undefined && books.booksTable !== undefined && pageIndex > 0) {
    console.dir(books.booksIdList);
    console.dir(books.booksTable);
    return (
      <>
        <div className={styles.ResultCount}>
          <p>{books.maxBooks}冊ヒットしました</p>
        </div>
        {books.booksIdList.map((bookId: number) => {
          return (
            <ResultBook
              history={props.history}
              data={
                {
                  bookId: bookId,
                  bookName: books.booksTable[bookId].bookName,
                  author: books.booksTable[bookId].author,
                  imgURL: books.booksTable[bookId].imgURL
                }
              }
              key={bookId}
            />
          );
        })}
        <PageNatior
          totalPage={Math.ceil(books.maxBooks / limit)}
          currentPage={pageIndex}
          handleClick={(e) => handleClick(e, pageIndex)}
        />
      </>
    );
  } else {
    console.log(`undefined page:${pageIndex}`);
    return <><p>Loading...</p></>
  }
};

export default ResultLists;

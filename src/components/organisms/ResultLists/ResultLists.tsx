import React, {
  useEffect, useState,
  // useState
} from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  get,
  // result
} from "lodash";
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
    ) || 0;

  // process: データ関係の処理

  // ページに関わる変数をReduxから取得
  const {
    isLoading,
    storedBooksTable,
    storedBooksIdList,
    statusCode,
    successedPageIndex
  } = useSelector((state: BooksState) => get(state, ["books"]));
  const dispatch = useDispatch();

  // console.log("stored");
  // console.dir(storedBooksIdList);
  // console.dir(storedBooksTable);
  // console.log("-----stored");
  // const [booksTable, setBooksTable] = useState<any>();
  // const [booksIdList, setBooksIdList] = useState<number[]>();
  // const [maxBooks, setMaxBooks] = useState(0);
  const [books, setBooks] = useState({booksTable: storedBooksTable, booksIdList: storedBooksIdList, maxBooks: 0});

  // console.log(isLoading, statusCode);  // warningもみ消し

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
    // if (successedPageIndex.includes(page)) {
    //   return;
    // }
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
      // setBooksIdList(result.booksIdList);
      // console.log("set booksIdList");
      // console.dir(booksIdList);
      // setBooksTable(result.booksTable);
      // console.log("set booksTable");
      // console.dir(booksTable);
      console.log("set books");
      setBooks({booksTable: result.booksTable, booksIdList: result.booksIdList, maxBooks: result.maxBooks});
      dispatch(fetchBookLists.done({ params: { pageIndex: page }, result }));
      // console.dir(result);
      /*setBooksIdList(result.booksIdList);
      console.log("set booksIdList");
      console.dir(booksIdList);
      setBooksTable(result.booksTable);
      console.log("set booksTable");
      console.dir(booksTable);*/
      // // setMaxBooks(result.maxBooks);
      // console.log(maxBooks);
      // console.dir(result.booksIdList);
      // console.dir(result.booksTable);
      // setBooksTable(result.booksTable);
      // console.log("booksTable");
      // console.dir(booksTable);
      // console.log(result.maxBooks);
      // setMaxBooks(result.maxBooks);
    } catch (error) {
      console.log(`Error fetcing in getBookLists: ${error}`);
    }
  };

  useEffect(() => {
    // (async() => {
    //   await getBookLists(pageIndex);
    //   console.log("----------");
    //   console.log(booksIdList);
    //   console.log(booksTable);
    //   console.log(maxBooks);
    //   console.log("----------");
    // })();
    getBookLists(pageIndex);
  // eslint-disable-next-line
  }, [pageIndex]);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>, pageIndex: any) => {
    // const encode = `book-lists?key=%E6%B7%B1%E5%B1%A4%E5%AD%A6%E7%BF%92&key=%E6%A9%9F%E6%A2%B0%E5%AD%A6%E7%BF%92&page=${pageIndex +
    //   1}`;
    // const param = search.split(/&/g)//.filter(param => param.startsWith("page="))
    //     .map(param => param.replace(`/^page=${pageIndex}/g`, `page=${pageIndex + 1}`))
    console.dir(e.currentTarget);
    const encode = `book-lists?${search.replace(`page=${pageIndex}`, `page=${e.currentTarget.value}`)}`;
    dispatch(push(encode));
    props.history.push(encode);
    window.scrollTo(0, 0);
  };

  // console.log(booksTable[booksIdList[0]]);  //undefined確認

  // if (booksIdList !== undefined && booksTable !== undefined) {
  if (books.booksIdList !== undefined && books.booksTable !== undefined && pageIndex > 0) {
    console.log(`not undefined page:${pageIndex}`);
    // console.dir(booksIdList);
    // console.log(`maxBooks:${maxBooks}`);
    // console.log(`booksTable:${booksTable}`);
    // console.dir(booksTable);
    console.dir(books);
    return (
      <>
        {/* <p>{maxBooks}</p>
        {booksIdList.map((bookId: number) => { */}
        <div className={styles.ResultCount}>
          <p>{books.maxBooks}冊ヒットしました</p>
        </div>
        {books.booksIdList.map((bookId: number) => {
          // console.log(bookId);
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
          // handleClick={() => console.log("Hello")}
          handleClick={(e) => handleClick(e, pageIndex)}
        />
        {/* <button onClick={() => handleClick(pageIndex)}>NEXT BUTTON</button> */}

      </>
    );
  } else {
    console.log(`undefined page:${pageIndex}`);
    console.dir(books.booksIdList);
    return <><p>Loading...</p></>
  }
};

export default ResultLists;

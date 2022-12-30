import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { push } from "connected-react-router";
import { RootState } from "../../../reducers";
import fetchBookLists, {
  BookLists,
  BooksState,
  BooksStateInfo,
  BooksTable
} from "../../../actions/resultlists";
import PageNatior from "../../molecules/PageNatior";
import fetchSearch from "../../../apis/fetchSearch";
import ResultBook from "../../molecules/ResultBook";
import styles from "./ResultLists.module.css";

export const ResultLists = () => {
  // init: ページ情報取得
  const search: string = useSelector(
    (state: RootState) => state.router.location.search
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
  const storedBooksTable = useSelector(
    (state: BooksState) => state.books.booksTable
  );
  const storedBooksIdList = useSelector(
    (state: BooksState) => state.books.booksIdList
  );
  const isLoading = useSelector((state: BooksState) => state.books.isLoading);
  const statusCode = useSelector((state: BooksState) => state.books.statusCode);
  const maxBooks = useSelector((state: BooksState) => state.books.maxBooks);
  const dispatch = useDispatch();
  const limit = 10;

  const normalizeData = (
    data: BookLists
  ): Pick<BooksStateInfo, "booksTable" | "booksIdList"> => {
    const booksTable: BooksTable = {};
    data.forEach(d => {
      booksTable[d.id] = d;
    });
    const booksIdList = data.map(d => d.id);
    return { booksTable, booksIdList };
  };

  const getBookLists = async (page: number) => {
    if (pageIndex <= 0) {
      return;
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
      dispatch(fetchBookLists.done({ params: { pageIndex: page }, result }));
    } catch (error) {
      dispatch(
        fetchBookLists.failed({
          params: { pageIndex: page },
          error: { statusCode: 500 } // TODO: サーバに接続できないときのため暫定で設定
        })
      );
      console.log(`Error fetching in getBookLists: ${error}`);
    }
  };

  const handleClick = (
    e: React.MouseEvent<HTMLButtonElement>,
    currentPageIndex: number
  ) => {
    const encode = `book-lists?${search.replace(
      `page=${currentPageIndex}`,
      `page=${e.currentTarget.value}`
    )}`;
    dispatch(push(encode));
    e.currentTarget.blur();
    // ページ上部に戻す
    window.scrollTo(0, 0);
  };

  useEffect(() => {
    if (search !== "") {
      getBookLists(pageIndex);
    }
  }, [pageIndex, search]);

  if (statusCode !== 200) {
    return (
      <div className={styles.ResultCount}>
        <p>Server Error</p>
      </div>
    );
  }
  if (isLoading && storedBooksIdList.length === 0) {
    return (
      <div className={styles.ResultCount}>
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <>
      <div className={styles.ResultCount}>
        <p>
          {maxBooks}
          冊ヒットしました
        </p>
      </div>
      {storedBooksIdList.map((bookId: number) => {
        return (
          <ResultBook
            data={{
              bookId,
              bookName: storedBooksTable[bookId].bookName,
              author: storedBooksTable[bookId].author,
              imgURL: storedBooksTable[bookId].imgURL
            }}
            key={bookId}
          />
        );
      })}
      <PageNatior
        totalPage={Math.ceil(maxBooks / limit)}
        currentPage={pageIndex}
        handleClick={e => handleClick(e, pageIndex)}
      />
    </>
  );
};

export default ResultLists;

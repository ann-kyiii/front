import React, { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import cx from "classnames";
import { push } from "connected-react-router";
import Header from "../organisms/Header";
import style from "./BookDetail.module.css";
import { RootState } from "../../reducers";

import fetchBookLists from "../../actions/resultlists";
import fetchBookId from "../../apis/fetchBookId";
import LoadError from "../organisms/LoadError";
import SelectButton from "../organisms/SelectButton";

export const BookDetail = () => {
  const dispatch = useDispatch();
  const sessValue = sessionStorage.getItem("keyword") || "";
  const path = useSelector(
    (state: RootState) => state.router.location.pathname
  ).slice(1);
  const bookId = parseInt(path.split("/")[1], 10);
  // storeのデータ取得
  const storeBookData = useSelector(
    (state: RootState) => state.books.booksTable[bookId]
  );

  // function
  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>, nextLink: string) => {
      dispatch(push(nextLink));
    },
    []
  );

  // 1冊の情報だけ取得する
  const getOneBook = async () => {
    const payload = {
      id: bookId
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

      const newData = {
        booksTable: { [json.id]: json },
        booksIdList: [json.id]
      };
      const result = { ...newData, maxBooks: 1 };
      dispatch(fetchBookLists.done({ params: { pageIndex: 0 }, result }));
    } catch (error) {
      console.log(`Error fetching in getBookLists: ${error}`);
    }
  };

  useEffect(() => {
    if (!storeBookData) {
      getOneBook();
    }
  }, []);

  const arg = path.split("/").slice(-1)[0];
  // book-detail/id になっているか
  if (!/^[0-9]+$/.test(arg)) {
    return (
      <LoadError backLink="/" text="Failed to read BookID" buttonName="Home" />
    );
  }

  if (storeBookData) {
    // borrower計算
    const stockN = storeBookData.find - storeBookData.borrower.length;
    const borrowAbled = stockN > 0;
    const returnAbled = storeBookData.borrower.length > 0;

    return (
      <div id={style.book_detail}>
        <Header backLink={`/book-lists?key=${sessValue}&page=1`} />

        <div className={style.main}>
          <div className={style.bookTitle}>{storeBookData.bookName}</div>
          <div className={style.bookImageBrock}>
            <img
              src={
                storeBookData.imgURL !== "unidentified"
                  ? storeBookData.imgURL
                  : `${process.env.PUBLIC_URL}/images/noImageAvailable.svg`
              }
              className={cx(style.image, {
                [style.image_error]: storeBookData.imgURL === "unidentified"
              })}
              alt="book title"
            />
          </div>
          <div className={style.contents}>
            <p className={style.itemName}>著者：</p>
            <p className={style.item}>{storeBookData.author}</p>
            <p className={style.itemName}>出版社：</p>
            <p className={style.item}>
              <span>{storeBookData.publisher}</span>
              <span> (</span>
              <span>{storeBookData.pubdate}</span>
              <span>)</span>
            </p>
            <p className={style.itemName}>ISBN：</p>
            <p className={style.item}>{storeBookData.ISBN}</p>
            <p className={style.itemName}>ジャンル：</p>
            <p className={style.item}>{storeBookData.genre}</p>
            <p className={style.itemName}>サブジャンル：</p>
            <p className={style.item}>{storeBookData.subGenre}</p>
            <p className={style.itemName}>在庫数：</p>
            <p className={style.item}>
              <span>{stockN}</span>
              <span> / </span>
              <span>{storeBookData.find}</span>
            </p>
          </div>
        </div>

        <div className={style.buttonsBlock}>
          <SelectButton
            isAbled={borrowAbled}
            nextLink={`/borrow/${bookId}`}
            className={["BorrowButtonColor"]}
            onClick={handleClick}
            text="Borrow"
          />
          <SelectButton
            isAbled={returnAbled}
            nextLink={`/return/${bookId}`}
            className={["ReturnButtonColor"]}
            onClick={handleClick}
            text="Return"
          />
          <SelectButton
            isAbled={false}
            nextLink={`/review/${bookId}`}
            className={["ReviewButtonColor"]}
            onClick={handleClick}
            text="Review"
          />
        </div>
      </div>
    );
  }
  return (
    <LoadError backLink="/" text="Failed to find the book" buttonName="Home" />
  );
};

export default BookDetail;

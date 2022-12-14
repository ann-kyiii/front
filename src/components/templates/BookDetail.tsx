import React, { useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { get } from "lodash";
import cx from "classnames";
import { push } from "connected-react-router";
import Header from "../organisms/Header";
import style from "./BookDetail.module.css";
import { RootState } from "../../reducers";

import imgError from "../../assets/images/noImageAvailable.svg";
import fetchBookLists from "../../actions/resultlists";
import fetchBookId from "../../apis/fetchBookId";
import LoadError from "../organisms/LoadError";
import SelectButton from "../organisms/SelectButton";

export const BookDetail = () => {
  // var
  const [bookID, setBookID] = useState(-1);
  const [imgURL, setImgURL] = useState(undefined);
  const dispatch = useDispatch();

  // function
  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>, nextLink: string) => {
      dispatch(push(nextLink));
      // eslint-disable-next-line
  }, []);


  // 1冊の情報だけ取得する
  const getOneBook = async (bookId: number) => {
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
      console.log(json);

      const newData = {
        booksTable: { [json.id]: json },
        booksIdList: [json.id]
      };
      console.log("#######################");
      console.log(newData);
      const result = { ...newData, maxBooks: 1 };
      dispatch(fetchBookLists.done({ params: { pageIndex: 0 }, result }));
    } catch (error) {
      console.log(`Error fetcing in getBookLists: ${error}`);
    }
  };

  const path = useSelector((state: RootState) =>
    get(state, ["router", "location", "pathname"])
  );

  // storeのデータ取得
  const storeBookData = useSelector((state: RootState) =>
    get(state, ["books", "booksTable", bookID])
  );

  const arg = path.split("/").slice(-1)[0];

  // book-detail/id になっているか
  if (!new RegExp(/^[0-9]+$/).test(arg)) {
    return (
      <LoadError backLink="/" text="Failed to read BookID" buttonName="Home" />
    );
  }
  if (bookID < 0) {
    setBookID(parseInt(arg, 10));
  }

  // 対象の本の情報がreduxにない ⇒ 対象の本だけ取得 (getでid指定で)
  if (!storeBookData) {
    getOneBook(bookID);

    // 一回目のrenderはこっち
    return (
      <LoadError
        backLink="/"
        text="Failed to find the book"
        buttonName="Home"
      />
    );
  }

  const data = storeBookData;

  // borrowr計算
  const stockN = data.find - data.borrower.length;
  const borrowAbled = stockN > 0;
  const returnAbled = data.borrower.length > 0;

  if (!imgURL) {
    setImgURL(data.imgURL);
  }

  return (
    <>
      <div id={style.book_detail}>
        <Header backLink="/" />

        <div className={style.main}>
          <div className={style.bookTitle}>{data.bookName}</div>
          <div className={style.bookImageBrock}>
            <img
              src={imgURL}
              className={cx(style.image, {
                [style.image_error]: imgURL !== data.imgURL
              })}
              onError={e => setImgURL(imgError)}
              alt="book title"
            />
          </div>
          <div className={style.contents}>
            <p className={style.itemName}>著者：</p>
            <p className={style.item}>{data.author}</p>
            <p className={style.itemName}>出版社：</p>
            <p className={style.item}>
              <>{data.publisher}</>
              <> (</>
              <>{data.pubdate}</>
              <>)</>
            </p>
            <p className={style.itemName}>ISBN：</p>
            <p className={style.item}>{data.ISBN}</p>
            <p className={style.itemName}>ジャンル：</p>
            <p className={style.item}>{data.genre}</p>
            <p className={style.itemName}>サブジャンル：</p>
            <p className={style.item}>{data.subGenre}</p>
            <p className={style.itemName}>在庫数：</p>
            <p className={style.item}>
              <>{stockN}</>
              <> / </>
              <>{data.find}</>
            </p>
          </div>
        </div>

        <div className={style.buttonsBlock}>
          <SelectButton
            isAbled={borrowAbled}
            nextLink={`/borrow/${bookID}`}
            className={["BorrowButtonColor"]}
            onClick={handleClick}
            text="Borrow"
          />
          <SelectButton
            isAbled={returnAbled}
            nextLink={`/return/${bookID}`}
            className={["ReturnButtonColor"]}
            onClick={handleClick}
            text="Return"
          />
          <SelectButton
            isAbled={false}
            nextLink={`/review/${bookID}`}
            className={["ReviewButtonColor"]}
            onClick={handleClick}
            text="Review"
          />
        </div>
      </div>
    </>
  );
};

export default BookDetail;

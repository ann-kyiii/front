import React, {
  // RefObject,
  // useCallback,
  useState
} from "react";
import cx from "classnames";
import style from "./ResultBook.module.css";

import  imgError  from "../../organisms/rena/noImageAvailable.svg";
import { AppProps } from "../../../App";
import { useDispatch } from "react-redux";
import { push } from "connected-react-router";

type ResultBook = AppProps & {
  data: {bookId: number, bookName: string, author: string, imgURL: string}
};

export const ResultBook = (props: ResultBook) => {
  const {history, data} = props;
  const [imgURL, setImgURL] = useState(data.imgURL);
  const dispatch = useDispatch();
  // const handleClick = useCallback((e: React.MouseEvent<HTMLButtonElement>, nextLink:string) => {
  //   // dispatch(push(nextLink));
  //   history.push(nextLink);
  // }, []);
  const handleClick = (e: React.MouseEvent<HTMLDivElement>, nextLink: string) => {
    const encode = encodeURI(nextLink);
    dispatch(push(encode));
    history.push(encode);
  }

  return (
    <div className={style.main} onClick={(e)=>handleClick(e, `book-detail/` + data.bookId)}>
      {/* <button onClick={(e)=>handleClick(e, "book-detail/" + data.bookId)}> */}
        <div className={style.content} >
          <div className={style.bookTitle}>{data.bookName}</div>
          <div className={style.bookAuthor}>著者：{data.author}</div>
        </div>
      {/* </button> */}
      <div className={style.bookImageBrock}>
        <img src={imgURL}
          className={cx(style.image,{[style.image_error]: imgURL !== data.imgURL,
          })} onError={(e) => setImgURL(imgError)}
          width="130"
          height="180"
          alt="book title"
        />
      </div>
    </div>
  );
};

export default ResultBook;

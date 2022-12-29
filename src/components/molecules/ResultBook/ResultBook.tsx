import { useDispatch } from "react-redux";
import { push } from "connected-react-router";
import style from "./ResultBook.module.css";

type ResultBookProps = {
  data: { bookId: number; bookName: string; author: string; imgURL: string };
};

export const ResultBook = ({ data }: ResultBookProps) => {
  const dispatch = useDispatch();
  const handleClick = (nextLink: string) => {
    const encode = encodeURI(nextLink);
    dispatch(push(encode));
  };

  return (
    <button
      type="button"
      className={style.Main}
      onClick={() => handleClick(`book-detail/${data.bookId}`)}
    >
      <div className={style.Content}>
        <h2 className={style.BookTitle}>{data.bookName}</h2>
        <div className={style.BookAuthor}>
          著者：
          {data.author}
        </div>
      </div>
      <div className={style.BookImageBrock}>
        <img
          src={
            data.imgURL !== "unidentified"
              ? data.imgURL
              : `${process.env.PUBLIC_URL}/images/noImageAvailable.svg`
          }
          width="130"
          height="180"
          alt="book title"
        />
      </div>
    </button>
  );
};

export default ResultBook;

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
      className={style.main}
      onClick={() => handleClick(`book-detail/${data.bookId}`)}
    >
      <div className={style.content}>
        <div className={style.bookTitle}>{data.bookName}</div>
        <div className={style.bookAuthor}>
          著者：
          {data.author}
        </div>
      </div>
      <div className={style.bookImageBrock}>
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

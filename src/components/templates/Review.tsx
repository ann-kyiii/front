import { useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import cx from "classnames";
import { push } from "connected-react-router";
import Header from "../organisms/Header";
import style from "./Review.module.css";
import { RootState } from "../../reducers";
import LoadError from "../organisms/LoadError";

export const Review = () => {
  const path = useSelector(
    (state: RootState) => state.router.location.pathname
  );

  // isFocus of textarea
  const [isFocus, setIsFocus] = useState(false);

  const dispatch = useDispatch();

  const handleFocus = () => {
    setIsFocus(true);
  };

  const handleBlur = () => {
    setIsFocus(false);
  };

  // isClick of submit Button
  const handleClick = useCallback(() => {
    // APIをたたいて、新コメ送信

    const nextLink = path;
    dispatch(push(nextLink));
  }, []);

  const handleClickHome = useCallback(() => {
    const nextLink = "/";
    dispatch(push(nextLink));
  }, []);

  const arg = path.split("/").slice(-1)[0];

  // book-detail/id になっているか
  if (!/^[0-9]+$/.test(arg)) {
    return (
      <LoadError backLink="/" text="Failed to read BookID" buttonName="Home" />
    );
  }

  const bookId = parseInt(arg, 10);

  // レビュー受信
  // const data =

  const data: string[] = new Array(0);
  for (let i = 0; i < 15; i += 1) {
    data.push(`test ${i}`);
  }

  const backLink = `/book-detail/${bookId}`;

  return (
    <div id={style.book_review}>
      <Header backLink={backLink} />

      <div className={style.reviewListBrock}>
        <ul className={style.reviewList}>
          {data.map(item => (
            <li className={style.reviewLi}>{item}</li>
          ))}
        </ul>
      </div>

      <p
        className={cx(style.textBlock, {
          [style.textBlock_big]: isFocus
        })}
      >
        <textarea
          className={style.textarea}
          onFocus={handleFocus}
          onBlur={handleBlur}
          placeholder="ここに入力"
        />
        <button
          type="button"
          onClick={handleClick}
          className={cx(style.button, {
            [style.button_visible]: isFocus
          })}
        >
          送
        </button>
      </p>
    </div>
  );
};

export default Review;

import React, { useCallback, useState } from "react";
import {
  // useDispatch,
  useSelector
} from "react-redux";
// import { push } from "connected-react-router";
import cx from "classnames";
import {
  // isEmpty,
  get
} from "lodash";
import { AppProps } from "../../App";
import Header from "../organisms/Header";
import Full from "../organisms/rena/Position/Full";
import style from "./Review.module.css";
// import { string } from "prop-types";
import { RootState } from "../../reducers";

export const Review = ({ history }: AppProps) => {
  const path = useSelector((state: RootState) =>
    get(state, ["router", "location", "pathname"])
  );

  // isFocus of textarea
  const [isFocus, setIsFocus] = useState(false);

  const handleFocus = () => {
    setIsFocus(true);
  };

  const handleBlur = () => {
    setIsFocus(false);
  };

  // isClick of submit Button
  const handleClick = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
    // APIをたたいて、新コメ送信

    const nextLink = path;
    // dispatch(push(nextLink));
    history.push(nextLink); // 遷移としてのリロード
    // eslint-disable-next-line
  }, []);

  // eslint-disable-next-line
  const handleClickHome = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
      const nextLink = "/";
      // dispatch(push(nextLink));
      history.push(nextLink);
      // eslint-disable-next-line
  }, []);

  const arg = path.split("/").slice(-1)[0];

  // book-detail/id になっているか
  if (!new RegExp(/^[0-9]+$/).test(arg)) {
    return (
      <Full
        history={history}
        objKey="loadError"
        backLink="/"
        text="Failed to read BookID"
        buttonName="Home"
      />
    );
  }

  const bookId = parseInt(arg, 10);

  // レビュー受信
  // const data =

  const data: any[] = new Array(0);
  for (let i = 0; i < 15; i += 1) {
    data.push(`test ${i}`);
  }

  const backLink = `/book-detail/${bookId}`;

  return (
    <>
      <div id={style.book_review}>
        <Header history={history} backLink={backLink} />

        <div className={style.reviewListBrock}>
          <ul className={style.reviewList}>
            {data.map((item, index) => (
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
    </>
  );
};

export default Review;

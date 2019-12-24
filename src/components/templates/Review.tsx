import React, { useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { push } from "connected-react-router";
import { AppProps } from "../../App";
import Header from "../../components/organisms/rena/Position/Header";
import Full from "../../components/organisms/rena/Position/Full";
import style from "./Review.module.css";
import { string } from "prop-types";
import cx from "classnames";
import { isEmpty, get } from "lodash";
import { RootState } from "../../reducers";



export const Review =  ({history}: AppProps)  => {

  let book_id : number;

  const path = useSelector((state: RootState) =>
    get(state, ["router", "location", "pathname"])
  ); 

  // isFocus of textarea
  let [isFocus, setIsFocus] = useState(false);

  const handleFocus = () => {
    setIsFocus(true);
  }

  const handleBlur = () => {
    setIsFocus(false);
  }

  // isClick of submit Button
  const handleClick = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {

    // APIをたたいて、新コメ送信
    
    var nextLink = (path);
    // dispatch(push(nextLink));
    history.push(nextLink); // 遷移としてのリロード

  }, []);

  
  const handleClickHome = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
    var nextLink = ("/");
    // dispatch(push(nextLink));
    history.push(nextLink);
  }, []);
  
  const arg =  (path.split("/")).slice(-1)[0];

  // book-detail/id になっているか
  if (!(new RegExp(/^[0-9]+$/)).test(arg)){  
    return (      
      <Full history={history} objKey="loadError"  backLink="/" text="Failed to read BookID" buttonName="Home"/>
      ); 
  }
  
  book_id = parseInt(arg);

  // レビュー受信
  // const data = 

  let data: any[] = new Array(0);
  for (var i = 0; i < 15; i++) { 
    data.push("test "+i);
  }

  const backLink  = "/book-detail/"+book_id;

  return (
    <>
      <div id={style.book_review}>

        <Header history={history} backButton={true}  backLink={backLink} />

          <div className={style.reviewListBrock}>
            <ul className={style.reviewList} >
              {data.map((item, index) => <li className={style.reviewLi}>{item}</li>)}         
            </ul>
          </div>

          <p className={cx(style.textBlock,{
            [style.textBlock_big]: isFocus,
          })}>
            <textarea className={style.textarea} onFocus={handleFocus} onBlur={handleBlur} placeholder="ここに入力"></textarea>
            <button type="button" onClick={handleClick} className={cx(style.button,{
              [style.button_visible]: isFocus,
            })}>送</button>
          </p>
      </div>

    </>
  )
};

export default Review;

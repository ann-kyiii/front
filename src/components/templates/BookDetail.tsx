import React, { useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { push } from "connected-react-router";
import { AppProps } from "../../App";
// import Header from "../organisms/Header";
import Header from "../../components/organisms/rena/Position/Header";
import Full from "../../components/organisms/rena/Position/Full";
import LoadData from "../../components/organisms/rena/Function/LoadData";
import style from "./BookDetail.module.css";
import { RootState } from "../../reducers";
import { isEmpty, get } from "lodash";
import { normalize, schema } from "normalizr";
import fetchBookLists, {
  BookLists,
  BooksState
} from "../../actions/resultlists";
import cx from "classnames";

import  imgError  from "../organisms/rena/noImageAvailable.svg";

export const BookDetail = ({history}: AppProps) => {
  // var 
  let [bookID, setBookID] = useState(-1);
  let [imgURL, setImgURL] = useState(undefined); 

  // function
  const handleClickBorrow = useCallback((e: React.MouseEvent<HTMLButtonElement>, id: number) => {
    var nextLink = ("/Borrow/"+id);
    // dispatch(push(nextLink));
    history.push(nextLink);
  }, []);
  
  // function
  const handleClickReturn = useCallback((e: React.MouseEvent<HTMLButtonElement>, id: number) => {
    var nextLink = ("/Return/"+id);
    // dispatch(push(nextLink));
    history.push(nextLink);
  }, []);
  
  // function
  const handleClickReview = useCallback((e: React.MouseEvent<HTMLButtonElement>, id: number) => {
    var nextLink = ("/Review/"+id);
    // dispatch(push(nextLink));
    history.push(nextLink);
  }, []);

  // function
  const handleClickHome = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
    var nextLink = ("/");
    // dispatch(push(nextLink));
    history.push(nextLink);
  }, []);
   
  const dispatch = useDispatch();
  
  const path = useSelector((state: RootState) =>
    get(state, ["router", "location", "pathname"])
  );  
    
  // storeのデータ取得
  const storeBookData = useSelector((state: RootState) =>
    get(state, ["books","booksTable",bookID])
  );
  
  const arg =  (path.split("/")).slice(-1)[0];

  // book-detail/id になっているか
  if (!(new RegExp(/^[0-9]+$/)).test(arg)){  
    return (
        <Full history={history} objKey="loadError"  backLink="/" text="Failed to read BookID" buttonName="Home"/>
      ); 
  }
  if (bookID<0){
    setBookID(parseInt(arg));
  }
  
  // 対象の本の情報がreduxにない ⇒ 対象の本だけ取得 (getでid指定で)
  if (!storeBookData){

    const dummy: boolean = true;
    
    LoadData({history, bookID, dummy});

    // 一回目のrenderはこっち    
    return (
      <Full history={history} objKey="loadError"  backLink="/" text="Failed to find the book" buttonName="Home"/>
      ); 
  
  }else{
    
    const data = storeBookData;

    // borrowr計算
    const stockN = data.find - (data.borrower).length;
    
    if (!imgURL){
      setImgURL(data.imgURL);
    }

    return (
      <>
        <div id={style.book_detail}>

          <Header history={history} backButton={true}  backLink="/" />

          <div className={style.main} >
            <div className={style.bookTytle}>{data.bookName}</div>
            <div className={style.bookImageBrock}><img src={imgURL} 
              className={cx(style.image,{[style.image_error]: imgURL!=data.imgURL,
            })} onError={(e) => setImgURL(imgError)}/></div>
            <div className={style.contents}>
              <p className={style.itemName}>著者：</p><p className={style.item}>{data.author}</p>
              <p className={style.itemName}>出版社：</p><p className={style.item}>{data.publisher} ({data.pubdate})</p>
              <p className={style.itemName}>ISBN：</p><p className={style.item}>{data.ISBN}</p>
              <p className={style.itemName}>ジャンル：</p><p className={style.item}>{data.genre}</p>
              <p className={style.itemName}>サブジャンル：</p><p className={style.item}>{data.subGenre}</p>
              <p className={style.itemName}>在庫数：</p><p className={style.item}>{stockN} / {data.find}</p>
            </div>
          </div>
            
          <div className={style.buttonsBlock} >
            <div className={style.borrow} >
              <button  className={cx(
                style.button,
                style.buttonColor1)} onClick={(e) => handleClickBorrow(e, bookID)}>Borrow</button>
            </div>
            <div className={style.return}>
              <button  className={cx(
                style.button,
                style.buttonColor2)} onClick={(e) => handleClickReturn(e, bookID)}>Return</button>
            </div>
            <div className={style.review}>
              <button  className={cx(
                style.button,
                style.buttonColor3)} onClick={(e) => handleClickReview(e, bookID)}>Review</button>
            </div>
          </div>          
          
        </div>
      </>
    )
      

  }
  

};

export default BookDetail;
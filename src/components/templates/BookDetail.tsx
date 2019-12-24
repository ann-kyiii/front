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
import cx from "classnames";

import  imgError  from "../organisms/rena/noImageAvailable.svg";

const dummy: boolean = false;

const ButtonAbleDisable = (props: any) => {
  const {abled, classname, onclick, text, nextLink} = props;

  if (abled){
    return (<><button  className={classname} onClick={(e)=>onclick(e, nextLink)}>{text}</button> </>);
  }else{
    return (<><button  className={classname} onClick={(e)=>onclick(e, nextLink)} disabled>{text}</button> </>);
  }
}

export const BookDetail = ({history}: AppProps) => {
  // var 
  let [bookID, setBookID] = useState(-1);
  let [imgURL, setImgURL] = useState(undefined); 

  // function
  const handleClick = useCallback((e: React.MouseEvent<HTMLButtonElement>, nextLink:string) => {
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
    
    LoadData({history, bookID, dummy});

    // 一回目のrenderはこっち    
    return (
      <Full history={history} objKey="loadError"  backLink="/" text="Failed to find the book" buttonName="Home"/>
      ); 
  
  }else{
    
    const data = storeBookData;

    // borrowr計算
    const stockN = data.find - (data.borrower).length;
    // const stockN=0;
    let borrow_abled = false;
    let return_abled = false;
    if (stockN>0){
      borrow_abled = true;
    }
    // if ((data.find - stockN)>0){
    if ((data.borrower).length>0){
      return_abled = true;
    }
        
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
              <ButtonAbleDisable abled={borrow_abled} 
                nextLink={"/Borrow/"+bookID}
                classname={cx(style.button, style.buttonColor1)} 
                onclick={handleClick} 
                text="Borrow"></ButtonAbleDisable>  
            </div>
            <div className={style.return}>
              <ButtonAbleDisable abled={return_abled} 
                nextLink={"/Return/"+bookID}
                classname={cx(style.button, style.buttonColor2)} 
                onclick={handleClick} 
                text="Return"></ButtonAbleDisable> 
            </div>
            <div className={style.review}>      
              <ButtonAbleDisable abled={false} 
                nextLink={"/Review/"+bookID}
                classname={cx(style.button, style.buttonColor3)} 
                onclick={handleClick} 
                text="Review"></ButtonAbleDisable>                
            </div>
          </div>          
          
        </div>
      </>
    )
      

  }
  

};

export default BookDetail;

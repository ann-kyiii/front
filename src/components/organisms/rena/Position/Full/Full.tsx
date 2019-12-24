import React, { useCallback } from "react";
import style from "./Full.module.css";
import { AppProps } from "../../../../../App";
import { useDispatch } from "react-redux";
import { push } from "connected-react-router";
import LoadError from "../../Object/LoadError";
import { Module } from "history";
import { url } from "inspector";

import bookImg from "../../../rena/book.svg";

// padding(15px,10px,0) = headerに置きたいobjectは wh(15,10)から配置される

type FullProps = AppProps & {
  objKey: string;
  backLink: string;
  text: string;
  buttonName?: string;
};

export const Full = (props: FullProps) => {
  
  const { objKey, text, backLink, history, buttonName } = props;
  const dispatch = useDispatch();

  // backLinkに遷移する関数
  const handleClick = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
    dispatch(push(backLink));
    history.push(backLink);
  }, []);


  var divStyle = {
    backgroundImage: 'url(' + bookImg + ')'
  };

  switch(objKey){
    case "loadError":
      return (
        <div className={style.back} style={divStyle}>
        {/* <div className={style.back} style={{backgroundColor: '#FF8A80', padding: '20px'}}> */}
        <header className={style.FullCenter}>
          <LoadError text={text} handleClick={handleClick} buttonName={buttonName} />
          </header>
        </div>
      );
      break;
    default:


  }


  return (<></>);
};

export default Full;

import React, { useCallback } from "react";
import style from "./Full.module.css";
import { AppProps } from "../../../../../App";
import { useDispatch } from "react-redux";
import { push } from "connected-react-router";
import LoadError from "../../Object/LoadError";
import { Module } from "history";

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

  switch(objKey){
    case "loadError":
      return (
        <header className={style.FullCenter}>
          <LoadError text={text} handleClick={handleClick} buttonName={buttonName} />
          </header>
      );
      break;
    default:


  }


  return (<></>);
};

export default Full;

import React, { useCallback } from "react";
import style from "./Header.module.css";
import { AppProps } from "../../../../../App";
import { useDispatch } from "react-redux";
import { push } from "connected-react-router";
import Arrow from "../../../../atoms/Arrow";
import { Module } from "history";

// padding(15px,10px,0) = headerに置きたいobjectは wh(15,10)から配置される

type HeaderProps = AppProps & {
  backButton: boolean;
  backLink: string;
};

export const Header = (props: HeaderProps) => {
  
  const { history, backLink, backButton } = props;
  const dispatch = useDispatch();

  // backLinkに遷移する関数
  const handleClick = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
    dispatch(push(backLink));
    history.push(backLink);
  }, []);

  // バックボタン付き
  if (backButton){   
    
    return (
      <header className={style.Heading}>
        <Arrow handleClick={handleClick} />
      </header>
    );
  }

  return (
    <>
    <header className={style.Heading}></header>
    </>
  );
};

export default Header;

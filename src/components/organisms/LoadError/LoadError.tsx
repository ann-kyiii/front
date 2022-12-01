import React, { useCallback } from "react";
import { useDispatch } from "react-redux";
import { push } from "connected-react-router";
import style from "./LoadError.module.css";
import bookImg from "../../../assets/images/book.svg";
import { AppProps } from "../../../App";

type Props = AppProps & {
  backLink: string;
  text: string;
  buttonName?: string;
};

export const LoadError = (props: Props) => {
  const { text, backLink, history, buttonName } = props;
  const dispatch = useDispatch();

  // backLinkに遷移する関数
  const handleClick = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
    dispatch(push(backLink));
    history.push(backLink);
    // eslint-disable-next-line
  }, []);

  console.log(text);
  console.log(buttonName);

  const divStyle = {
    backgroundImage: `url(${bookImg})`
  };

  return (
    <div className={style.back} style={divStyle}>
      <div className={style.FullCenter}>
        <div className={style.text}>{text}</div>
        <button type="button" onClick={handleClick} className={style.button}>
          {buttonName}
        </button>
      </div>
    </div>
  );
};

export default LoadError;

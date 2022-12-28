import React, { useCallback } from "react";
import { useDispatch } from "react-redux";
import { push } from "connected-react-router";
import style from "./LoadError.module.css";

type Props = {
  backLink: string;
  text: string;
  buttonName: string;
};

export const LoadError = (props: Props) => {
  const { text, backLink, buttonName } = props;
  const dispatch = useDispatch();

  // backLinkに遷移する関数
  const handleClick = useCallback(() => {
    dispatch(push(backLink));
  }, []);

  const divStyle = {
    backgroundImage: `url(${`${process.env.PUBLIC_URL}/images/book.svg`})`
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

import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { push } from "connected-react-router";
import style from "./LoadError.module.css";

type Props = {
  backLink: string;
  text: string;
  buttonName: string;
};

export const LoadError = ({ backLink, text, buttonName }: Props) => {
  const dispatch = useDispatch();

  // backLinkに遷移する関数
  const handleClick = useCallback(() => {
    dispatch(push(backLink));
  }, []);

  const backgroundImageStyle = {
    backgroundImage: `url(${`${process.env.PUBLIC_URL}/images/book.svg`})`
  };

  return (
    <div className={style.FullCenter} style={backgroundImageStyle}>
      <p className={style.Text}>{text}</p>
      <button type="button" onClick={handleClick} className={style.Button}>
        {buttonName}
      </button>
    </div>
  );
};

export default LoadError;

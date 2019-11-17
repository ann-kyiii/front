import React, { useCallback } from "react";
import cx from "classnames";
import style from "./LoadError.module.css";

type Props = {
  text: string;
  buttonName?: string;
  handleClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
};

export const LoadError = (props: Props) => {
  const { handleClick, text, buttonName } = props;
  console.log(text);
  console.log(buttonName);

  return (
    <>
    <div className={style.text}>{text}</div>
    <button
      type="button"
      onClick={handleClick} 
      className={style.button}
      >{buttonName}</button>
    </>
  );
};

export default LoadError;

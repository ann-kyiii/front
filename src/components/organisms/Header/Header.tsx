import React, { useCallback } from "react";
import { useDispatch } from "react-redux";
import { push } from "connected-react-router";
import styles from "./Header.module.css";
import Arrow from "../../atoms/Arrow";
import { AppProps } from "../../../App";

type HeaderProps = AppProps & {
  backLink: string;
};

export const Header = (props: HeaderProps) => {
  const { history, backLink } = props;
  const dispatch = useDispatch();

  const handleClick = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
    dispatch(push(backLink));
    // eslint-disable-next-line
  }, []);

  return (
    <header className={styles.Heading}>
      <Arrow handleClick={handleClick} />
    </header>
  );
};

export default Header;

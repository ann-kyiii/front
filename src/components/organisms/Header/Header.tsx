import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { push } from "connected-react-router";
import styles from "./Header.module.css";
import Arrow from "../../atoms/Arrow";

type HeaderProps = {
  backLink: string;
};

export const Header = ({ backLink }: HeaderProps) => {
  const dispatch = useDispatch();

  const handleClick = useCallback(() => {
    dispatch(push(backLink));
  }, []);

  return (
    <header className={styles.Heading}>
      <Arrow handleClick={handleClick} />
    </header>
  );
};

export default Header;

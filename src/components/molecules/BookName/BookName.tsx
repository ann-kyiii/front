import React from "react";
import styles from "./BookName.module.css";

type BookNameProps = {
  children: React.ReactNode
}

export const BookName = (props: BookNameProps) => (
  <h1 className={styles.BookName}>{props.children}</h1>
);

export default BookName;

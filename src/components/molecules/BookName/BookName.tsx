import React from "react";
import styles from "./BookName.module.css";

export const BookName: React.FC = ({ children }) => (
  <h1 className={styles.BookName}>{children}</h1>
);

export default BookName;

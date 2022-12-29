import React from "react";
import styles from "./HomeTitle.module.css";

type HomeTitleProps = {
  children: React.ReactNode;
};

export const HomeTitle = ({ children }: HomeTitleProps) => (
  <h1 className={styles.HomeTitle}>{children}</h1>
);

export default HomeTitle;

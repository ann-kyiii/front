import React from "react";
import styles from "./HomeTitle.module.css";

type HomeTitleProps = {
  children: React.ReactNode
}

export const HomeTitle = (props: HomeTitleProps) => (
  <h1 className={styles.HomeTitle}>{props.children}</h1>
);

export default HomeTitle;

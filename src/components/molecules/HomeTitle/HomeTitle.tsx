import React from "react";
import styles from "./HomeTitle.module.css";

export const HomeTitle: React.FC = ({ children }) => (
  <h1 className={styles.HomeTitle}>{children}</h1>
);

export default HomeTitle;

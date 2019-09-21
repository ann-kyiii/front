import React from "react";
import { useSelector } from "react-redux";
import get from "lodash/get";
import { RootState } from "../../reducers";
import styles from "./Sample.module.css";

const Sample = () => {
  const path = useSelector((state: RootState) =>
    get(state, ["router", "location", "pathname"])
  );
  return (
    <div>
      <p className={styles.author}>{path}</p>
    </div>
  );
};
export default Sample;

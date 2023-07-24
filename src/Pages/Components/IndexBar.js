import React from "react";
import styles from "./IndexBar.module.css";

const IndexBar = ({ id }) => {
  return (
    <div className={styles.container}>
      <div className={id === 1 ? styles.selected : styles.index}>성적</div>
      <div className={id === 2 ? styles.selected : styles.index}>활동</div>
      <div className={id === 3 ? styles.selected : styles.index}>졸업</div>
      <div className={id === 4 ? styles.selected : styles.index}>블로그</div>
    </div>
  );
};

export default IndexBar;

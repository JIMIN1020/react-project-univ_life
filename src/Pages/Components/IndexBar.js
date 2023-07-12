import React from "react";
import styles from "./IndexBar.module.css";

const IndexBar = () => {
  return (
    <div className={styles.container}>
      <div className={styles.index}>성적</div>
      <div className={styles.index}>활동</div>
      <div className={styles.index}>졸업</div>
      <div className={styles.index}>블로그</div>
    </div>
  );
};

export default IndexBar;

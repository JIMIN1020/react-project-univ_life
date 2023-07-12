import React from "react";
import styles from "./Page.module.css";
import Profile from "./Components/Profile";
import IndexBar from "./Components/IndexBar";

export const Page = () => {
  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <h1>대학 생활 기록 웹사이트</h1>
      </div>
      <div className={styles.bottom}>
        <IndexBar />
        <div className={styles.contents}>
          <Profile />
          <div className={styles.contentBox}>""여기에 코드 작성""</div>
        </div>
      </div>
    </div>
  );
};

export default Page;

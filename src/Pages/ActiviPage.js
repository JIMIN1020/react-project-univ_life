import React from "react";
import styles from "./ActiviPage.module.css";
import Profile from "./Components/Profile";
import IndexBar from "./Components/IndexBar";

const GradePage = () => {
  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <h1>대학 생활 기록 웹사이트</h1>
      </div>
      <div className={styles.bottom}>
        <IndexBar />
        <div className={styles.contents}>
          <Profile />
          <div className={styles.contentBox}>
            <h3>활동관리</h3>
            <div className={styles.content}>
            <h3>1</h3>
              <div className={styles.div1}>
              </div>
              <div className={styles.div1}>
              </div>
              <div className={styles.div1}>
              </div>
            </div>
            <div className={styles.content}>
            <h3>2</h3>
              <div className={styles.div1}>
              </div>
              <div className={styles.div1}>
              </div>
              <div className={styles.div1}>
              </div>
            </div>
            <div className={styles.content}>
            <h3>3</h3>
              <div className={styles.div1}>
              </div>
              <div className={styles.div1}>
              </div>
              <div className={styles.div1}>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GradePage;

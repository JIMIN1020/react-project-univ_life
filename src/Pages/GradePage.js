import React from "react";
import styles from "./GradePage.module.css";
import Profile from "./Components/Profile";
import IndexBar from "./Components/IndexBar";
import PlanBottom from "./Components/GraduationPage/PlanBottom";
import PlanTop from "./Components/GraduationPage/PlanTop";

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
            <div className={styles.contentTop}>
              <div className={styles.div1}>
              </div>
              <div className={styles.div1}>
              </div>
              <div className={styles.div1}>
              </div>
            </div>
            <div className={styles.contentBottom}>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GradePage;

import React from "react";
import styles from "./PlanBottom.module.css";

const PlanBottom = () => {
  return (
    <div className={styles.container}>
      <h3>2022학년도 1학기</h3>
      <div className={styles.lines}>
        <div className={styles.leftline}></div>
        <div className={styles.circle}></div>
        <div className={styles.rightline}></div>
      </div>
      <div className={styles.planBox}>
        <div className={styles.plan}></div>
      </div>
    </div>
  );
};

export default PlanBottom;

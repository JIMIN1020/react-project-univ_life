import React from "react";
import styles from "./PlanTop.module.css";

const PlanTop = () => {
  return (
    <div className={styles.container}>
      <div className={styles.planBox}>
        <div className={styles.plan}></div>
      </div>
      <div className={styles.lines}>
        <div className={styles.leftline}></div>
        <div className={styles.circle}></div>
        <div className={styles.rightline}></div>
      </div>
      <h3>2022학년도 2학기</h3>
    </div>
  );
};

export default PlanTop;

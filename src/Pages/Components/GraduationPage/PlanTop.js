import React, { useState } from "react";
import styles from "./PlanTop.module.css";
import { BsRecordFill } from "react-icons/bs";

const PlanTop = ({ plan }) => {
  return (
    <div className={styles.container}>
      <div className={styles.planBox}>
        <div className={styles.plan}>
          {plan.plans.map((plan) => {
            return (
              <div className={styles.line}>
                <BsRecordFill className={styles.icon} />
                <span>{plan.text}</span>
              </div>
            );
          })}
        </div>
      </div>
      <div className={styles.lines}>
        <div className={styles.leftline}></div>
        <div className={styles.circle}></div>
        <div className={styles.rightline}></div>
      </div>
      <h3>{plan.title}</h3>
    </div>
  );
};

export default PlanTop;

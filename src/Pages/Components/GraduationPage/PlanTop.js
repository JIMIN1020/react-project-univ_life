import React, { useState } from "react";
import styles from "./PlanTop.module.css";
import { BsRecordFill } from "react-icons/bs";

const PlanTop = ({ plan }) => {
  const [modalOpen, setModalOpen] = useState(false); // 모달창 오픈 관리
  return (
    <div className={styles.container}>
      <div className={styles.planBox}>
        <div className={styles.plan}>
          <div className={styles.line}>
            <BsRecordFill className={styles.icon} />
            <span>토익 900점 넘기</span>
          </div>
          <div className={styles.line}>
            <BsRecordFill className={styles.icon} />
            <span>컴활 자격증 따기</span>
          </div>
          <div className={styles.line}>
            <BsRecordFill className={styles.icon} />
            <span>컴활 자격증 따기</span>
          </div>
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

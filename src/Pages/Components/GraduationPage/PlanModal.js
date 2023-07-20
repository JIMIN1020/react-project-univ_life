import React, { useState } from "react";
import styles from "./PlanModal.module.css";
import { BsCheck2, BsRecordFill, BsPlusCircle } from "react-icons/bs";

const PlanModal = ({
  setModalOpen,
  currentYear,
  setCurrentYear,
  currentTerm,
  setCurrentTerm,
}) => {
  const [newPlan, setNewPlan] = useState(false);
  const addPlan = () => {
    //마지막
    setCurrentTerm((prev) => !prev);
    if (currentTerm) {
      setCurrentYear((prev) => prev + 1);
    }
  };
  return (
    <div className={styles.container}>
      <div className={styles.btnContainer}>
        <button className={styles.closeBtn} onClick={() => setModalOpen(false)}>
          X
        </button>
      </div>
      <h3>
        {currentYear}학년도 {currentTerm + 1}학기 계획
      </h3>
      <span>해당 학기 계획을 입력해주세요.</span>
      <div className={styles.planContainer}>
        {newPlan && <NewPlan />}
        <button className={styles.newBtn} onClick={() => setNewPlan(true)}>
          <BsPlusCircle className={styles.icon} />
        </button>
      </div>
      <div className={styles.btnContainer}>
        <button className={styles.addBtn} onClick={addPlan}>
          add
        </button>
      </div>
    </div>
  );
};

export default PlanModal;

const NewPlan = () => {
  /* --------------- 입력 값 처리 --------------- */
  const handleChange = (e) => {
    setText(e.target.value);
  };
  const [text, setText] = useState("");
  return (
    <div className={styles.line}>
      <BsRecordFill style={{ width: "12px", margin: "0 10px" }} />
      <input
        type="text"
        value={text}
        className={styles.input}
        onChange={(e) => handleChange(e)}
      />
      <BsCheck2 style={{ width: "17px", marginLeft: "10px" }} />
    </div>
  );
};

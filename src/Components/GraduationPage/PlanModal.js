import React, { useState } from "react";
import styles from "./PlanModal.module.css";
import { BsCheck2, BsRecordFill, BsPlusCircle, BsXLg } from "react-icons/bs";
import { collection, doc, setDoc } from "firebase/firestore";
import { authService, dbService } from "../../fbase";

const PlanModal = ({
  setModalOpen,
  currentYear,
  setCurrentYear,
  currentTerm,
  setCurrentTerm,
}) => {
  const [tempPlan, setTempPlan] = useState([]); // 임시 plan
  const [newPlan, setNewPlan] = useState(false); // 계획 추가용

  /* --------------- 최종 plan 처리 --------------- */
  const addPlan = async () => {
    // 파이어베이스에 추가
    const docRef = doc(
      collection(
        dbService,
        "graduationPage",
        authService.currentUser.uid,
        "plan"
      )
    );
    await setDoc(docRef, {
      createdAt: Date.now(),
      title: `${currentYear}학년도 ${currentTerm + 1}학기`,
      removable: true,
      plans: tempPlan,
    });

    // 이전 마지막 요소 삭제 불가능하게 조정
    // const prevLast = plan[plan.length - 1];
    // prevLast.removable = false;

    // setting
    setCurrentTerm((prev) => !prev);
    if (currentTerm) {
      setCurrentYear((prev) => prev + 1);
    }
    setModalOpen(false);
  };

  /* --------------- plan 삭제 처리 --------------- */
  const deletePlan = (id) => {
    let newPlan = tempPlan.filter((plan) => plan.id !== id);
    setTempPlan(newPlan);
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
      <span className={styles.desc}>해당 학기 계획을 입력해주세요.</span>
      <div className={styles.bottom}>
        <div className={styles.planContainer}>
          {tempPlan.map((plan) => {
            return <Plan plan={plan} deletePlan={deletePlan} />;
          })}
          {newPlan && (
            <NewPlan setTempPlan={setTempPlan} setNewPlan={setNewPlan} />
          )}
          <button className={styles.newBtn} onClick={() => setNewPlan(true)}>
            <BsPlusCircle className={styles.icon} />
          </button>
        </div>
        <div className={styles.addContainer}>
          <button className={styles.addBtn} onClick={addPlan}>
            add
          </button>
        </div>
      </div>
    </div>
  );
};

export default PlanModal;

const NewPlan = ({ setTempPlan, setNewPlan }) => {
  const [text, setText] = useState("");
  const addPlan = () => {
    const newPlan = {
      id: Date.now(),
      text: text,
    };
    setTempPlan((prev) => [...prev, newPlan]);
    setNewPlan(false);
  };
  /* --------------- 입력 값 처리 --------------- */
  const handleChange = (e) => {
    setText(e.target.value);
  };

  return (
    <div className={styles.line}>
      <BsRecordFill style={{ width: "12px", margin: "0 10px" }} />
      <input
        type="text"
        value={text}
        className={styles.input}
        onChange={(e) => handleChange(e)}
      />
      <button className={styles.checkBtn} onClick={addPlan}>
        <BsCheck2
          style={{ width: "20px", height: "17px", marginLeft: "5px" }}
        />
      </button>
    </div>
  );
};

const Plan = ({ plan, deletePlan }) => {
  return (
    <div className={styles.line}>
      <BsRecordFill style={{ width: "12px", margin: "0 10px" }} />
      <span className={styles.text}>{plan.text}</span>
      <button className={styles.delBtn} onClick={() => deletePlan(plan.id)}>
        <BsXLg />
      </button>
    </div>
  );
};

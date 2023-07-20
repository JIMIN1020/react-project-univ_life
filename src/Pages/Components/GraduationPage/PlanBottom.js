import React from "react";
import styles from "./PlanBottom.module.css";
import { BsRecordFill, BsPencilSquare, BsFillTrash3Fill } from "react-icons/bs";

const PlanBottom = ({ plan, setEditModal, setEditPlan, deletePlan }) => {
  const handleClick = () => {
    setEditPlan(plan);
    setEditModal(true);
  };
  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <h3>{plan.title}</h3>
        <button className={styles.editBtn} onClick={handleClick}>
          <BsPencilSquare className={styles.editIcon} />
        </button>
        {plan.removable && (
          <button className={styles.binBtn} onClick={() => deletePlan(plan.id)}>
            <BsFillTrash3Fill className={styles.binIcon} />
          </button>
        )}
      </div>
      <div className={styles.lines}>
        <div className={styles.leftline}></div>
        <div className={styles.circle}></div>
        <div className={styles.rightline}></div>
      </div>
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
    </div>
  );
};

export default PlanBottom;

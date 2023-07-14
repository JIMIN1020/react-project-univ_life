import React from "react";
import styles from "./Todo.module.css";

const Todo = () => {
  return (
    <div className={styles.container}>
      <div>
        <input type="checkbox" />
        <span>todo</span>
      </div>
      <button className={styles.button} type="submit">
        X
      </button>
    </div>
  );
};

export default Todo;

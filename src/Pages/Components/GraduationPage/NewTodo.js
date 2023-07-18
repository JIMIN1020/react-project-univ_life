import React, { useState } from "react";
import styles from "./NewTodo.module.css";
import { BsCheckSquare, BsCheckSquareFill, BsCheck2 } from "react-icons/bs";

const NewTodo = ({ todo, setTodo, setEditing }) => {
  const [text, setText] = useState("");

  /* --------------- 입력 값 처리 --------------- */
  const handleChange = (e) => {
    setText(e.target.value);
  };

  /* --------------- 새로운 todo 추가 --------------- */
  const addTodo = (e) => {
    e.preventDefault();

    const newTodo = {
      id: Date.now(),
      value: text,
      completed: false,
    };

    setTodo([...todo, newTodo]);
    setEditing(false);
  };

  return (
    <div className={styles.container}>
      <div>
        <label>
          <input className={styles.checkbox} type="checkbox" />
          <BsCheckSquare />
        </label>

        <input
          type="text"
          value={text}
          className={styles.input}
          onChange={(e) => handleChange(e)}
        />
      </div>
      <button
        className={styles.button}
        type="submit"
        onClick={(e) => addTodo(e)}
      >
        <BsCheck2 style={{ width: "15px", height: "20px" }} />
      </button>
    </div>
  );
};

export default NewTodo;

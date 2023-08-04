import React, { useState } from "react";
import styles from "./NewTodo.module.css";
import { BsCheckSquare, BsCheck2 } from "react-icons/bs";
import { doc, setDoc, collection } from "firebase/firestore";
import { authService, dbService } from "../../fbase";

const NewTodo = ({ todo, setTodo, setAddTodo }) => {
  const [text, setText] = useState("");

  /* --------------- 입력 값 처리 --------------- */
  const handleChange = (e) => {
    setText(e.target.value);
  };

  /* --------------- 새로운 todo 추가 --------------- */
  const addTodo = async (e) => {
    e.preventDefault();

    const newTodo = {
      value: text,
      completed: false,
      createdAt: Date.now(),
    };
    setAddTodo(false);

    // 파이어베이스에 추가
    try {
      const docRef = doc(
        collection(
          dbService,
          "graduationPage",
          `${authService.currentUser.uid}`,
          "todo"
        )
      );
      await setDoc(docRef, newTodo);
    } catch (e) {}
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

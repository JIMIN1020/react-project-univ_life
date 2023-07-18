import React from "react";
import styles from "./Todo.module.css";
import { BsCheckSquare, BsCheckSquareFill, BsXLg } from "react-icons/bs";

const Todo = ({ todo, completeTodo, deleteTodo }) => {
  return (
    <div className={styles.container}>
      <div>
        <label>
          <input
            className={styles.checkbox}
            type="checkbox"
            onChange={() => completeTodo(todo.id)}
          />
          {todo.completed ? <BsCheckSquareFill /> : <BsCheckSquare />}
        </label>

        <span
          style={
            todo.completed ? { textDecoration: "line-through" } : undefined
          }
        >
          {todo.value}
        </span>
      </div>
      <button
        className={styles.button}
        type="submit"
        onClick={() => deleteTodo(todo.id)}
      >
        <BsXLg />
      </button>
    </div>
  );
};

export default Todo;

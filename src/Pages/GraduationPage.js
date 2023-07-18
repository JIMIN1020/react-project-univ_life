import React, { useState } from "react";
import styles from "./GraduationPage.module.css";
import Profile from "./Components/Profile";
import IndexBar from "./Components/IndexBar";
import PlanBottom from "./Components/GraduationPage/PlanBottom";
import PlanTop from "./Components/GraduationPage/PlanTop";
import Todo from "./Components/GraduationPage/Todo";
import NewTodo from "./Components/GraduationPage/NewTodo";
import { BsPlusCircle } from "react-icons/bs";

const GraduationPage = () => {
  const [todo, setTodo] = useState([]);
  const [editing, setEditing] = useState(false);

  /* --------------- todo 완료 처리 --------------- */
  const completeTodo = (id) => {
    let newTodo = todo.map((todo) => {
      if (todo.id === id) {
        todo.completed = !todo.completed;
      }
      return todo;
    });

    setTodo(newTodo);
  };

  /* --------------- todo 삭제 처리 --------------- */
  const deleteTodo = (id) => {
    let newTodo = todo.filter((todo) => todo.id !== id);
    setTodo(newTodo);
  };

  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <h1>대학 생활 기록 웹사이트</h1>
      </div>
      <div className={styles.bottom}>
        <IndexBar />
        <div className={styles.contents}>
          <Profile />
          <div className={styles.contentBox}>
            <div className={styles.contentTop}>
              <div className={styles.div1}>
                <div className={styles.line1}>
                  <div className={styles.circle}>입학 년도</div>
                </div>
                <div className={styles.line2}>
                  <div className={styles.circle}>졸업 년도</div>
                </div>
              </div>
              <div className={styles.div2}>
                <div className={styles.left}>
                  <div className={styles.circle}>졸업 요건</div>
                </div>
                <div className={styles.todoContainer}>
                  <div>
                    {todo.map((todo) => {
                      return (
                        <Todo
                          todo={todo}
                          completeTodo={completeTodo}
                          deleteTodo={deleteTodo}
                        />
                      );
                    })}
                    {editing ? (
                      <NewTodo
                        todo={todo}
                        setTodo={setTodo}
                        setEditing={setEditing}
                      />
                    ) : undefined}
                    <button
                      className={styles.addBtn}
                      onClick={() => setEditing(true)}
                    >
                      <BsPlusCircle style={{ height: "20px", width: "20px" }} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.contentBottom}>
              <PlanBottom />
              <PlanTop />
              <PlanBottom />
              <PlanTop />
              <PlanBottom />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GraduationPage;

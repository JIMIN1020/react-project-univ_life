import React from "react";
import styles from "./BlogPage.module.css";
import Profile from "./Components/Profile";
import IndexBar from "./Components/IndexBar";
import Card from "./Components/BlogPage/Card";

export const BlogPage = () => {
  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <h1>대학 생활 기록 웹사이트</h1>
      </div>
      <div className={styles.bottom}>
        <IndexBar id={4} />
        <div className={styles.contents}>
          <Profile />
          <div className={styles.contentBox}>
            <div className={styles.category_bar}>
              <text className={styles.text}>category</text>
              <button className={styles.category_btn}>All</button>
              <button className={styles.category_btn}>일상</button>
              <button className={styles.category_btn}>메모</button>
              <button className={styles.category_btn}>기타</button>
              <button className={styles.category_add}>+add</button>
            </div>
            <div className={styles.cardsList}>
              <Card />
              <Card />
              <Card />
              <Card />
              <Card />
              <div className={styles.card_add}>+</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogPage;

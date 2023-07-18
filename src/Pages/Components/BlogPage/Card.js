import React from "react";
import styles from "./Card.module.css";

const Card = () => {
  return (
      <div className={styles.card}>
        <div className={styles.main}>
            <text className={styles.title}>제목</text>
            <button className={styles.category_btn}>All</button>
        </div>
        <p className={styles.content}>
            오늘은 이거저거이거를 했다. 너무 재밌었다. 날씨는 맑고 습하지도 않아서 좋았다. 요즘 잠을 자도자도 졸린데 역시 방학은 방학인가보다.
            내일은 저거이거저거를 해야겠다. 오늘도 뿌듯한 하루였다.
        </p>
      </div>
  )
}

export default Card;

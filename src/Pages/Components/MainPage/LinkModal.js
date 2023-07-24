import React, { useState } from "react";
import styles from "./LinkModal.module.css";

const LinkModal = () => {
  return (
    <div className={styles.container}>
      <div className={styles.line}>
        <div className={styles.link}>
          <a href="https://www.sookmyung.ac.kr">
            <img
              src={process.env.PUBLIC_URL + "/Images/sookmyung.png"}
              width="40px"
              alt="img"
            />
          </a>
          <span>숙명여대</span>
        </div>
        <div className={styles.link}>
          <a href="https://portal.sookmyung.ac.kr">
            <img
              src={process.env.PUBLIC_URL + "/Images/potal.png"}
              width="35px"
              alt="img"
            />
          </a>
          <span>숙명포털</span>
        </div>
        <div className={styles.link}>
          <a href="https://snowe.sookmyung.ac.kr">
            <img
              src={process.env.PUBLIC_URL + "/Images/tempIcon.png"}
              width="35px"
              alt="img"
            />
          </a>
          <span>Snowe</span>
        </div>
        <div className={styles.link}>
          <a href="https://snowboard.sookmyung.ac.kr">
            <img
              src={process.env.PUBLIC_URL + "/Images/tempIcon.png"}
              width="35px"
              alt="img"
            />
          </a>
          <span>스노우보드</span>
        </div>
      </div>
      <div className={styles.line}>
        <div className={styles.link}>
          <a href="https://lib.sookmyung.ac.kr">
            <img
              src={process.env.PUBLIC_URL + "/Images/tempIcon.png"}
              width="35px"
              alt="img"
            />
          </a>
          <span>중앙도서관</span>
        </div>
        <div className={styles.link}>
          <a href="https://snoway.sookmyung.ac.kr">
            <img
              src={process.env.PUBLIC_URL + "/Images/tempIcon.png"}
              width="35px"
              alt="img"
            />
          </a>
          <span>Snoway</span>
        </div>
        <div className={styles.link}>
          <a href="https://www.sookmyung.ac.kr/kr/university-life/academic-calendar.do">
            <img
              src={process.env.PUBLIC_URL + "/Images/tempIcon.png"}
              width="35px"
              alt="img"
            />
          </a>
          <span>학사일정</span>
        </div>
        <div className={styles.link}>
          <a href="https://www.snorose.com">
            <img
              src={process.env.PUBLIC_URL + "/Images/tempIcon.png"}
              width="35px"
              alt="img"
            />
          </a>
          <span>스노로즈</span>
        </div>
      </div>
    </div>
  );
};

export default LinkModal;

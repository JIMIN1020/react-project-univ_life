import { useState } from "react";
import Lottie from "lottie-react";
import lottie from "../assets/lottie.json";
import styles from "./SignUpPage.module.css";
import { Link } from "react-router-dom";

const SignUpPage = () => {
  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <h1>대학 생활 기록 웹사이트</h1>
      </div>
      <div className={styles.bottom}>
        <div className={styles.profile}>
          <div className={styles.prof_top}>
            <h2>Sign Up</h2>
            <div>
              <Lottie
                animationData={lottie}
                loop={0.5}
                className={styles.lottie}
              />
            </div>
          </div>
          <div className={styles.prof_bottom}>
            <div className={styles.inputBox}>
              <span>ID(메일)</span>
              <input type="text" />
            </div>
            <div className={styles.inputBox}>
              <span>PW</span>
              <input type="password" />
            </div>
            <div className={styles.inputBox}>
              <span>이름</span>
              <input type="text" />
            </div>
            <div className={styles.inputBox}>
              <span>학번</span>
              <input type="text" />
            </div>
            <div className={styles.inputBox}>
              <span>학과</span>
              <input type="text" />
            </div>
            <div className={styles.inputBox}>
              <span>학교</span>
              <input type="text" disabled value="숙명여자대학교" />
            </div>
          </div>
          <div className={styles.buttonBox}>
            <button style={{ marginRight: "5px" }}>가입하기</button>
            <Link to="/" style={{ textDecoration: "none" }}>
              <button style={{ marginLeft: "5px" }}>취소</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;

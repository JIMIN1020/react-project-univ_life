import { useState } from "react";
import Lottie from "lottie-react";
import lottie from "../assets/lottie.json";
import styles from "./LoginPage.module.css";
import { Link } from "react-router-dom";

const LoginPage = () => {
  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <h1>대학 생활 기록 웹사이트</h1>
      </div>
      <div className={styles.bottom}>
        <div className={styles.profile}>
          <div className={styles.prof_top}>
            <h2>Log In</h2>
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
              <span>ID</span>
              <input type="text" />
            </div>
            <div className={styles.inputBox}>
              <span>PW</span>
              <input type="password" />
            </div>
          </div>
          <div className={styles.buttonBox}>
            <Link to="/signup" style={{ textDecoration: "none" }}>
              <button style={{ marginRight: "5px" }}>가입하기</button>
            </Link>

            <button style={{ marginLeft: "5px" }}>로그인</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;

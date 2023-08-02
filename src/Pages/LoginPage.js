import { useState } from "react";
import Lottie from "lottie-react";
import lottie from "../assets/lottie.json";
import styles from "./LoginPage.module.css";
import { Link } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { authService } from "../fbase";

const LoginPage = () => {
  const [id, setId] = useState("");
  const [pw, setPw] = useState("");
  const [error, setError] = useState("");

  /* ------------ 입력 값 처리 ------------ */
  const onChange = (e) => {
    const {
      target: { name, value },
    } = e;
    if (name === "id") setId(value);
    else if (name === "pw") setPw(value);
  };

  /* ------------ 로그인 처리 ------------ */
  const onSubmit = async (e) => {
    e.preventDefault();

    // Sign in 처리
    try {
      const data = await signInWithEmailAndPassword(authService, id, pw);
    } catch (error) {
      console.log(JSON.stringify(error));
      setError(error);
    }
  };

  /* ------------ 에러 처리 ------------ */
  const printError = () => {
    const { code } = error;

    if (code === "auth/invalid-email")
      return (
        <p className={styles.errorMsg}>유효하지 않은 이메일 양식입니다.</p>
      );
    else if (code === "auth/user-not-found")
      return (
        <p className={styles.errorMsg}>사용자 정보가 존재하지 않습니다.</p>
      );
  };
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
          <form onSubmit={onSubmit}>
            <div className={styles.prof_bottom}>
              <div className={styles.inputBox}>
                <span>ID</span>
                <input name="id" type="email" value={id} onChange={onChange} />
              </div>
              <div className={styles.inputBox}>
                <span>PW</span>
                <input
                  name="pw"
                  type="password"
                  value={pw}
                  onChange={onChange}
                />
              </div>
              {printError()}
            </div>
            <div className={styles.buttonBox}>
              <Link to="/signup" style={{ textDecoration: "none" }}>
                <button style={{ marginRight: "5px" }}>가입하기</button>
              </Link>
              <button style={{ marginLeft: "5px" }}>로그인</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;

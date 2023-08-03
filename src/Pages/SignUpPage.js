import { useState } from "react";
import Lottie from "lottie-react";
import lottie from "../assets/lottie.json";
import styles from "./SignUpPage.module.css";
import { Link, useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { authService, dbService } from "../fbase";
import { addDoc, collection, setDoc, doc } from "firebase/firestore";

const SignUpPage = () => {
  const navigate = useNavigate();
  const [mail, setMail] = useState("");
  const [pw, setPw] = useState("");
  const [name, setName] = useState("");
  const [studentId, setStudentId] = useState("");
  const [major, setMajor] = useState("");

  /* ------------ 입력 값 처리 ------------ */
  const onChange = (e) => {
    const {
      target: { name, value },
    } = e;

    if (name === "mail") setMail(value);
    else if (name === "pw") setPw(value);
    else if (name === "name") setName(value);
    else if (name === "studentId") setStudentId(value);
    else if (name === "major") setMajor(value);
  };

  /* ------------ 가입 처리 ------------ */
  const onSubmit = async (e) => {
    e.preventDefault();

    // 가입
    try {
      const data = await createUserWithEmailAndPassword(authService, mail, pw);
    } catch (error) {
      alert("비밀번호는 6자리 이상이어야 합니다.");
      return;
    }

    // 홈으로 이동
    navigate("/");

    // 가입한 유저 정보 저장
    await setDoc(doc(dbService, "users", authService.currentUser.uid), {
      name,
      studentId,
      major,
    });

    await setDoc(
      doc(
        dbService,
        `graduationPage/${authService.currentUser.uid}/years`,
        "0"
      ),
      {
        enteryear: 2016,
        graduationYear: 2020,
        graduationMonth: 2,
      }
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
            <h2>Sign Up</h2>
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
                <input
                  name="mail"
                  type="email"
                  value={mail}
                  onChange={onChange}
                  placeholder="ID(이메일) 입력"
                />
              </div>
              <div className={styles.inputBox}>
                <span>PW</span>
                <input
                  name="pw"
                  type="password"
                  value={pw}
                  onChange={onChange}
                  placeholder="비밀번호 입력 (6자리 이상)"
                />
              </div>
              <div className={styles.inputBox}>
                <span>이름</span>
                <input
                  name="name"
                  type="text"
                  value={name}
                  onChange={onChange}
                  placeholder="이름 입력"
                />
              </div>
              <div className={styles.inputBox}>
                <span>학번</span>
                <input
                  name="studentId"
                  type="text"
                  value={studentId}
                  onChange={onChange}
                  placeholder="학번 입력"
                />
              </div>
              <div className={styles.inputBox}>
                <span>학과</span>
                <input
                  name="major"
                  type="text"
                  value={major}
                  onChange={onChange}
                  placeholder="학과(전공) 입력"
                />
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
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;

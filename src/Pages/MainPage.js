import { useState } from "react";
import styles from "./MainPage.module.css";
import {
  BsFileEarmarkBarGraph,
  BsFiles,
  BsBookmarkStar,
  BsMortarboard,
  BsFileText,
} from "react-icons/bs";
import LinkModal from "./Components/MainPage/LinkModal";
import { Link } from "react-router-dom";

const MainPage = () => {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <h1>대학 생활 기록 웹사이트</h1>
      </div>
      <div className={styles.bottom}>
        <div className={styles.menuContainer}>
          <Link to="/grade" style={{ textDecoration: "none" }}>
            <div className={styles.iconContainer}>
              <BsFileEarmarkBarGraph className={styles.icon} />
              <span>성적</span>
            </div>
          </Link>
          <Link to="/activity" style={{ textDecoration: "none" }}>
            <div className={styles.iconContainer}>
              <BsFiles className={styles.icon} />
              <span>활동</span>
            </div>
          </Link>
          <Link to="/graduation" style={{ textDecoration: "none" }}>
            <div className={styles.iconContainer}>
              <BsMortarboard className={styles.icon} />
              <span>졸업</span>
            </div>
          </Link>
          <Link to="/blog" style={{ textDecoration: "none" }}>
            <div
              className={styles.iconContainer}
              style={{ marginRight: "16px" }}
            >
              <BsFileText className={styles.icon} />
              <span>블로그</span>
            </div>
          </Link>
          <div className={styles.iconContainer}>
            <button
              onClick={() => setModalOpen((prev) => !prev)}
              style={{ marginLeft: "-6px" }}
            >
              <BsBookmarkStar className={styles.icon} />
              <span>링크</span>
            </button>
          </div>
          {modalOpen && <LinkModal setModalOpen={setModalOpen} />}
        </div>
        <div className={styles.profile}>
          <div className={styles.title}>
            <h2>Profile</h2>
          </div>
          <div className={styles.prof_bottom}>
            <div className={styles.leftside}>
              <div className={styles.imageBox}>
                <img
                  src={process.env.PUBLIC_URL + "/Images/noonsong.gif"}
                  className={styles.img}
                  width="150px"
                  alt="img"
                />
              </div>
            </div>
            <div className={styles.rightside}>
              <div className={styles.detail}>
                <span>이름 : 눈송이</span>
                <span>학번 : 200000</span>
                <span>학교 : 숙명여자대학교</span>
                <span>학과 : IT공학과</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainPage;

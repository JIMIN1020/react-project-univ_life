import React, {useState} from "react";
import styles from "./ActiviPage.module.css";
import Profile from "./Components/Profile";
import IndexBar from "./Components/IndexBar";
import ActiviModal from "./Components/ActiviPage/ActiviModal";
import { Link } from "react-router-dom";

const ActiviPage = () => {
  const [activi,setActivi] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [activiSelected, setActiviSelected] = useState({});
  const [savedActiviContent, setSavedActiviContent] = useState(""); // 저장된 내용 상태 변수

  const handleClick = (activi) => {
    setModalOpen(true);
    setActiviSelected(activi);
    setActivi(prevActivi => [...prevActivi, <div className={styles.div}></div>]);
  };

  const handleSaveActiviContent = (content) => {
    setSavedActiviContent(content);
    // 저장된 내용을 활용하여 필요한 로직을 추가
  };

  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <Link to="/" style={{ textDecoration: "none" }}><h1>대학 생활 기록 웹사이트</h1></Link>
      </div>
      <div className={styles.bottom}>
        <IndexBar id={2} />
        <div className={styles.contents}>
          <Profile />
          <div class={styles.contentContainer}>
            <div class={styles.section}></div>
            <div class={styles.section}></div>
          </div>
          <div className={styles.contentBox}>
            <div className={styles.contentTop}>
              <div className={styles.contenth}>동아리<br/>&<br/>학회</div>
              <div className={styles.contentBottom}>
              <button
                      className={styles.addBtn}
                      onClick={()=>handleClick(activi)}
                    >+
                    </button>
              {modalOpen && (
                <ActiviModal {...activiSelected} setModalOpen={setModalOpen} onSave={handleSaveActiviContent} />
            )}
              </div>
            </div>
            <div className={styles.divider}></div>
            <div className={styles.contentTop}>
              <div className={styles.contenth}>대외활동</div>
              <div className={styles.contentBottom}>
                <div className={styles.div} onClick={()=>handleClick(activi)}></div>
              </div>
            </div>
            <div className={styles.divider}></div>
            <div className={styles.contentTop}>
              <div className={styles.contenth}>프로젝트</div>
              <div className={styles.contentBottom}>
                <div className={styles.div}></div>
                <div className={styles.div}></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActiviPage;

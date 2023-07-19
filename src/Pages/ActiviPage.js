import React, {useState} from "react";
import styles from "./ActiviPage.module.css";
import Profile from "./Components/Profile";
import IndexBar from "./Components/IndexBar";
import ActiviModal from "./Components/ActiviPage/ActiviModal";
import { BsPlusCircle } from "react-icons/bs";

const GradePage = () => {
  const [activi,setActivi] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [activiSelected, setActiviSelected] = useState({});

  const handleClick = (activi) => {
    setModalOpen(true);
    setActiviSelected(activi);
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
                      onClick={()=>handleClick(activiSelected)}
                    >
                      <BsPlusCircle style={{ height: "30px", width: "30px" }} />
                    </button>
              </div>
            </div>
            <div className={styles.divider}></div>
            <div className={styles.contentTop}>
              <div className={styles.contenth}>대외활동</div>
              <div className={styles.contentBottom}>
                <div className={styles.div}></div>
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
      {modalOpen && (
        <ActiviModal {...activiSelected} setModalOpen={setModalOpen} />
      )}
    </div>
  );
};

export default GradePage;

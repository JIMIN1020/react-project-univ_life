import React, { useState } from "react";
import styles from "./ActiviPage.module.css";
import Profile from "../Components/Profile"
import IndexBar from "../Components/IndexBar";
import ActiviModal from "../Components/ActiviPage/ActiviModal";
import { BsPlusCircle } from 'react-icons/bs';
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

const ActiviPage = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [activiSelected, setActiviSelected] = useState({});
  const [savedActiviContent, setSavedActiviContent] = useState({});

  // 각 섹션(contentTop)에 대한 별도의 상태 변수들
  const [activi1, setActivi1] = useState([
    { id: Date.now(), date: "2022년도 2학기", title : "공과대학 학생회 재정사무국" },
  ]);
  const [activi2, setActivi2] = useState([]);
  const [activi3, setActivi3] = useState([]);

  // 각 섹션(contentTop)에 대한 별도의 handleClick 함수들
  const handleClick1 = () => {
    const newActivi = {
      id: Date.now(),
      content: <div className={styles.div}></div>
    };
    setActivi1((prevActivi) => [...prevActivi, newActivi]);
    setActiviSelected({ type: "동아리 & 학회" });
  };

  const handleClick2 = () => {
    const newActivi = {
      id: Date.now(),
      content: <div className={styles.div}></div>
    };
    setActivi2((prevActivi) => [...prevActivi, newActivi]);
    setActiviSelected({ type: "대외활동" });
  };

  const handleClick3 = () => {
    const newActivi = {
      id: Date.now(),
      content: <div className={styles.div}></div>
    };
    setActivi3((prevActivi) => [...prevActivi, newActivi]);
    setActiviSelected({ type: "프로젝트" });
  };

  const handleClick = (date, title) => {
    setModalOpen(true);
    setActiviSelected({ type: "동아리 & 학회" }); // Assuming this is the default type for now
    setSavedActiviContent({ date, title });
  };

  const handleSaveActiviContent = (content) => {
    setModalOpen(false);
    
    // activiSelected.type에 따라 상태를 업데이트
    switch (activiSelected.type) {
      case "동아리 & 학회":
        setActivi1((prevActivi) => {
          // prevActivi에서 변경된 내용이 있는 항목의 id를 찾음
          const updatedIndex = prevActivi.findIndex((item) => item.id === savedActiviContent.id);
          // 변경된 내용이 있는 경우 해당 항목을 업데이트하고 아닌 경우 그대로 두기
          return prevActivi.map((item, index) => (index === updatedIndex ? { ...item, ...content } : item));
        });
        break;
      case "대외활동":
        setActivi2((prevActivi) => {
          // prevActivi에서 변경된 내용이 있는 항목의 id를 찾음
          const updatedIndex = prevActivi.findIndex((item) => item.id === savedActiviContent.id);
          // 변경된 내용이 있는 경우 해당 항목을 업데이트하고 아닌 경우 그대로 두기
          return prevActivi.map((item, index) => (index === updatedIndex ? { ...item, ...content } : item));
        });
        break;
      case "프로젝트":
        setActivi3((prevActivi) => {
          // prevActivi에서 변경된 내용이 있는 항목의 id를 찾음
          const updatedIndex = prevActivi.findIndex((item) => item.id === savedActiviContent.id);
          // 변경된 내용이 있는 경우 해당 항목을 업데이트하고 아닌 경우 그대로 두기
          return prevActivi.map((item, index) => (index === updatedIndex ? { ...item, ...content } : item));
        });
        break;
      default:
        break;
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <Link to="/" style={{ textDecoration: "none" }}>
          <h1>대학 생활 기록 웹사이트</h1>
        </Link>
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
              <div className={styles.contenth}>
                동아리<br />
                &<br />
                학회<br/>
                <button className={styles.Btn} onClick={handleClick1}>
                <BsPlusCircle style={{ height: "18px", width: "18px" }} />
              </button>
              </div>
              
              <Swiper
                slidesPerView={3}
                spaceBetween={10}
                className={styles.contentBottom}
              >
                {activi1.map((item) => (
                  <SwiperSlide key={item.id} className={styles.div} onClick={() => handleClick(item.date, item.title)}>
                     {/* 내용이 저장되어 있으면 저장된 내용을 보여줌 */}
                     {savedActiviContent && savedActiviContent.type === "동아리 & 학회" && (
                      <>
                        <p className={styles.dText}>{savedActiviContent.date}</p>
                        <p className={styles.cText}>{savedActiviContent.title}</p>
                      </>
                      )}
                      {!savedActiviContent && (
                      <>
                        <p className={styles.dText}>{item.date}</p>
                        <p className={styles.cText}>{item.title}</p>
                      </>
                      )}
                  </SwiperSlide>
                ))}
                
              </Swiper>
              {modalOpen && (
                <ActiviModal
                  {...activiSelected}
                  setModalOpen={setModalOpen}
                  onSave={handleSaveActiviContent}
                  savedActiviContent={savedActiviContent}
                  setSavedActiviContent={setSavedActiviContent}
                />
              )}
            </div>
            <div className={styles.divider}></div>
            <div className={styles.contentTop}>
              <div className={styles.contenth}>대외활동<br/>
              <button className={styles.Btn} onClick={handleClick2}>
                <BsPlusCircle style={{ height: "18px", width: "18px" }} />
              </button>
              </div>
              <Swiper
                slidesPerView={3}
                spaceBetween={10}
                className={styles.contentBottom}
              >
                {activi2.map((item) => (
                  <SwiperSlide key={item.id} className={styles.div} onClick={() => handleClick(item.date, item.title)}>
                     {/* 내용이 저장되어 있으면 저장된 내용을 보여줌 */}
                     {savedActiviContent && savedActiviContent.type === "동아리 & 학회" && (
                      <>
                        <p className={styles.dText}>{savedActiviContent.date}</p>
                        <p className={styles.cText}>{savedActiviContent.title}</p>
                      </>
                      )}
                      {!savedActiviContent && (
                      <>
                        <p className={styles.dText}>{item.date}</p>
                        <p className={styles.cText}>{item.title}</p>
                      </>
                      )}
                  </SwiperSlide>
                ))}
                
              </Swiper>
            </div>
            <div className={styles.divider}></div>
            <div className={styles.contentTop}>
              <div className={styles.contenth}>프로젝트<br/>
              <button className={styles.Btn} onClick={handleClick3}>
                <BsPlusCircle style={{ height: "18px", width: "18px" }} />
              </button>
              </div>
              <Swiper
                slidesPerView={3}
                spaceBetween={10}
                className={styles.contentBottom}
              >
                {activi3.map((item) => (
                  <SwiperSlide key={item.id} className={styles.div} onClick={() => handleClick(item.date, item.title)}>
                     {/* 내용이 저장되어 있으면 저장된 내용을 보여줌 */}
                     {savedActiviContent && savedActiviContent.type === "동아리 & 학회" && (
                      <>
                        <p className={styles.dText}>{savedActiviContent.date}</p>
                        <p className={styles.cText}>{savedActiviContent.title}</p>
                      </>
                      )}
                      {!savedActiviContent && (
                      <>
                        <p className={styles.dText}>{item.date}</p>
                        <p className={styles.cText}>{item.title}</p>
                      </>
                      )}
                  </SwiperSlide>
                ))}
                
              </Swiper>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActiviPage;

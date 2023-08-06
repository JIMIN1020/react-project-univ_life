import React, { useState, useEffect } from "react";
import styles from "./ActiviPage.module.css";
import Profile from "../Components/Profile";
import IndexBar from "../Components/IndexBar";
import ActiviModal from "../Components/ActiviPage/ActiviModal";
import { BsPlusCircle } from 'react-icons/bs';
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { v4 as uuidv4 } from 'uuid';

import { collection, doc, setDoc, updateDoc, getDoc, getDocs } from "firebase/firestore";
import { authService, dbService } from "../fbase";


const ActiviPage = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [activiSelected, setActiviSelected] = useState({});
  
  // 각 섹션(contentTop)에 대한 별도의 상태 변수
  const [activi1, setActivi1] = useState([]);
  const [activi2, setActivi2] = useState([]);
  const [activi3, setActivi3] = useState([]);


  useEffect(() => {
    // Firestore에서 데이터 불러오는 함수 정의
    const fetchData = async () => {
      try {
        const querySnapshot1 = await getDocs(collection(dbService, `activiPage/${authService.currentUser.uid}/content1`));
        const data1 = querySnapshot1.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setActivi1(data1);
  
        const querySnapshot2 = await getDocs(collection(dbService, `activiPage/${authService.currentUser.uid}/content2`));
        const data2 = querySnapshot2.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setActivi2(data2);
  
        const querySnapshot3 = await getDocs(collection(dbService, `activiPage/${authService.currentUser.uid}/content3`));
        const data3 = querySnapshot3.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setActivi3(data3);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };
  
    fetchData(); // 데이터 불러오기 함수 호출
  }, []);
  


  // 각 섹션(contentTop)에 대한 별도의 handleClick 함수
  const handleClick1 = async() => {
    const newActivi = {
      id: uuidv4(),
      content: <div className={styles.div}></div>
    };
    setActivi1((prevActivi) => [...prevActivi, newActivi]);
    setActiviSelected({ type: "동아리 & 학회" });
  };

  const handleClick2 = () => {
    const newActivi = {
      id: uuidv4(),
      content: <div className={styles.div}></div>
    };
    setActivi2((prevActivi) => [...prevActivi, newActivi]);
    setActiviSelected({ type: "대외활동" });
  };

  const handleClick3 = () => {
    const newActivi = {
      id: uuidv4(),
      content: <div className={styles.div}></div>
    };
    setActivi3((prevActivi) => [...prevActivi, newActivi]);
    setActiviSelected({ type: "프로젝트" });
  };

  // modal 관련 handleClick
  const handleClick = (section, id) => {
    setModalOpen(true);
    setActiviSelected({ type: section, id: id });
  };

  const handleSaveActiviContent = async(content) => {
    setModalOpen(false);

    // 선택된 div의 정보가 있는 경우에만 처리
    if (activiSelected) {
      const { type, id } = activiSelected;
      const updatedContent = { ...content, id};

      switch (type) {
        case "동아리 & 학회":
          setActivi1((prevActivi) => {
            const updatedActivi = prevActivi.map((item) => {
              if (item.id === id) {
                return updatedContent;
              } else {
                return item;
              }
            });
            return updatedActivi;
          });
          
          // firebase 추가 (비동기 처리)
          try {
            const docRef = doc(
              dbService,
              `activiPage/${authService.currentUser.uid}/content1/${id}`
            );
            const docSnapshot = await getDoc(docRef);
      
            if (docSnapshot.exists()) {
              await updateDoc(docRef, updatedContent);
            }
            else {
              await setDoc(docRef, updatedContent);
            }
          } catch (e) {
            console.error("Error saving data: ", e);
          }
          break;
          
        case "대외활동":
          setActivi2((prevActivi) => {
            const updatedActivi = prevActivi.map((item) => {
              if (item.id === id) {
                return updatedContent;
              } else {
                return item;
              }
            });
            return updatedActivi;
          });
      
          // firebase 추가 (비동기 처리)
          try {
            const docRef = doc(
              dbService,
              `activiPage/${authService.currentUser.uid}/content2/${id}`
            );
            const docSnapshot = await getDoc(docRef);
      
            if (docSnapshot.exists()) {
              await updateDoc(docRef, updatedContent);
            }
            else {
              await setDoc(docRef, updatedContent);
            }
          } catch (e) {
            console.error("Error saving data: ", e);
          }
          break;
        case "프로젝트":
          setActivi3((prevActivi) => {
            return prevActivi.map((item) => {
              if (item.id === id) {
                return updatedContent;
              } else {
                return item;
              }
            });
          });
          // firebase 추가 (비동기 처리)
          try {
            const docRef = doc(
              dbService,
              `activiPage/${authService.currentUser.uid}/content3/${id}`
            );
            const docSnapshot = await getDoc(docRef);
      
            if (docSnapshot.exists()) {
              await updateDoc(docRef, updatedContent);
            }
            else {
              await setDoc(docRef, updatedContent);
            }
          } catch (e) {
            console.error("Error saving data: ", e);
          }
          break;

        default:
          break;
      }
    }

    // 선택 상태 초기화
    setActiviSelected(null);
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
          <div className={styles.contentContainer}>
            <div className={styles.section}></div>
            <div className={styles.section}></div>
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
              
              <Swiper slidesPerView={3} spaceBetween={10} className={styles.contentBottom}>
                {activi1.map((item) => (
                  <SwiperSlide
                    key={item.id} 
                    className={styles.div} 
                    onClick={() => handleClick("동아리 & 학회", item.id)}
                  >
                    <p className={styles.dText}>{item.date}</p>
                    <p className={styles.cText}>{item.title}</p>
                  </SwiperSlide>
                ))}
              </Swiper> 
            </div>
            <div className={styles.divider}></div>
            <div className={styles.contentTop}>
              <div className={styles.contenth}>대외활동<br/>
                <button className={styles.Btn} onClick={handleClick2}>
                  <BsPlusCircle style={{ height: "18px", width: "18px" }} />
                </button>
              </div>
              <Swiper slidesPerView={3} spaceBetween={10} className={styles.contentBottom}>
                {activi2.map((item) => (
                  <SwiperSlide
                    key={item.id} 
                    className={styles.div} 
                    onClick={() => handleClick("대외활동", item.id)}
                  >
                    <p className={styles.dText}>{item.date}</p>
                    <p className={styles.cText}>{item.title}</p>
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
              <Swiper slidesPerView={3} spaceBetween={10} className={styles.contentBottom}>
                {activi3.map((item) => (
                  <SwiperSlide
                    key={item.id} 
                    className={styles.div} 
                    onClick={() => handleClick("프로젝트", item.id)}
                  >
                    <p className={styles.dText}>{item.date}</p>
                    <p className={styles.cText}>{item.title}</p>
                  </SwiperSlide>
                ))}
              </Swiper>

              {modalOpen && (
                <ActiviModal
                setModalOpen={setModalOpen}
                onSave={handleSaveActiviContent}
                savedActiviContent={
                  activiSelected.type === "동아리 & 학회"
                    ? activi1.find((item) => item.id === activiSelected.id)
                    : activiSelected.type === "대외활동"
                    ? activi2.find((item) => item.id === activiSelected.id)
                    : activi3.find((item) => item.id === activiSelected.id)
                }
              />
               )}
 
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActiviPage;
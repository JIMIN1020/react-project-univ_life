import React, { useEffect, useState } from "react";
import styles from "./GraduationPage.module.css";
import Profile from "../Components/Profile";
import IndexBar from "../Components/IndexBar";
import PlanBottom from "../Components/GraduationPage/PlanBottom";
import PlanTop from "../Components/GraduationPage/PlanTop";
import Todo from "../Components/GraduationPage/Todo";
import NewTodo from "../Components/GraduationPage/NewTodo";
import { BsPlusCircle, BsPencilSquare } from "react-icons/bs";
import SelectBox from "../Components/GraduationPage/SelectBox";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import PlanModal from "../Components/GraduationPage/PlanModal";
import EditModal from "../Components/GraduationPage/EditModal";
import { Link } from "react-router-dom";
import {
  collection,
  query,
  onSnapshot,
  orderBy,
  updateDoc,
  doc,
  getDoc,
  deleteDoc,
} from "firebase/firestore";
import { authService, dbService } from "../fbase";

const GraduationPage = () => {
  const [todo, setTodo] = useState([]); // todo 데이터
  // 계획 데이터
  const [plan, setPlan] = useState([]);

  const [addTodo, setAddTodo] = useState(false); // todo 추가 처리를 위한 state
  const [editYearE, setEditE] = useState(false); // 입학년도 수정을 위한 state
  const [editYearG, setEditG] = useState(false); // 졸업년도 수정을 위한 state
  const [year, setYear] = useState({}); // 연도 관리 state
  const [modalOpen, setModalOpen] = useState(false); // 모달창 오픈 관리
  const [editPlan, setEditPlan] = useState({}); // 수정할 계획
  const [editModal, setEditModal] = useState(false); // 수정 모달 오픈 관리
  const [currentYear, setCurrentYear] = useState(year.enterYear + 2); // 현재 입력된 계획년도 저장용
  const [currentTerm, setCurrentTerm] = useState(false); // 현재 입력된 계획 학기 저장용
  let [top, setTop] = useState(0); // 계획 렌더링용 state

  /* --------------- useEffect --------------- */
  useEffect(() => {
    setTop(0);
    getTodo();
    getYears();
    getPlan();
  }, []);

  useEffect(() => {
    changeEnterYear();
  }, [year.enterYear]);

  /* --------------- todo 데이터 가져오기 --------------- */
  const getTodo = async () => {
    const q = query(
      collection(
        dbService,
        `graduationPage/${authService.currentUser.uid}/todo`
      ),
      orderBy("createdAt", "asc")
    );
    onSnapshot(q, (snapshot) => {
      const todos = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setTodo(todos);
    });
  };

  /* --------------- plan 데이터 가져오기 --------------- */
  const getPlan = async () => {
    const q = query(
      collection(
        dbService,
        `graduationPage/${authService.currentUser.uid}/plan`
      ),
      orderBy("createdAt", "asc")
    );
    onSnapshot(q, (snapshot) => {
      const plans = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setPlan(plans);
    });
  };

  /* --------------- 연도 데이터 가져오기 --------------- */
  const getYears = async () => {
    const q = query(
      collection(
        dbService,
        `graduationPage/${authService.currentUser.uid}/years`
      )
    );
    onSnapshot(q, (snapshot) => {
      const year = snapshot.docs.map((doc) => ({
        ...doc.data(),
      }));
      setYear(year[0]);
    });
  };

  /* --------------- todo 완료 처리 --------------- */
  const completeTodo = async (docId) => {
    const docRef = doc(
      dbService,
      `graduationPage/${authService.currentUser.uid}/todo`,
      docId
    );
    const docSnapShot = await getDoc(docRef);
    const currentValue = docSnapShot.data().completed;
    await updateDoc(docRef, { completed: !currentValue });
  };

  /* --------------- todo 삭제 처리 --------------- */
  const deleteTodo = async (docId) => {
    const docRef = doc(
      dbService,
      `graduationPage/${authService.currentUser.uid}/todo`,
      docId
    );
    await deleteDoc(docRef);
  };

  /* --------------- plan 삭제 처리 --------------- */
  const deletePlan = async (docId) => {
    const docRef = doc(
      dbService,
      `graduationPage/${authService.currentUser.uid}/plan`,
      docId
    );
    await deleteDoc(docRef);

    if (currentTerm === false) {
      setCurrentYear((prev) => prev - 1);
      setCurrentTerm(true);
    } else {
      setCurrentTerm(false);
    }

    // 마지막 요소 삭제 가능하게 조정
    let len = plan.length;
    if (len > 5) {
      plan.forEach(async (plan) => {
        console.log(plan);
        len--;
        if (len === 1) {
          const docRef = doc(
            dbService,
            `graduationPage/${authService.currentUser.uid}/plan`,
            plan.id
          );
          await updateDoc(docRef, { removable: true });
        }
      });
    }
  };

  const changeRemovable = () => {
    let len = plan.length;
    if (len >= 5) {
      plan.forEach(async (plan) => {
        len--;
        if (len === 0) {
          const docRef = doc(
            dbService,
            `graduationPage/${authService.currentUser.uid}/plan`,
            plan.id
          );
          await updateDoc(docRef, { removable: false });
        }
      });
    }
  };

  /* --------------- 입학년도 변경 시 --------------- */
  const changeEnterYear = () => {
    let n = -1;

    // 파이어베이스 상에서 수정
    const q = query(
      collection(
        dbService,
        `graduationPage/${authService.currentUser.uid}/plan`
      ),
      orderBy("createdAt", "asc")
    );
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const plans = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      plans.forEach(async (plan) => {
        const docRef = doc(
          dbService,
          `graduationPage/${authService.currentUser.uid}/plan`,
          plan.id
        );
        n++;
        await updateDoc(docRef, {
          title: `${year.enterYear + parseInt(n / 2)}학년도 ${(n % 2) + 1}학기`,
        });
      });
      setPlan(plans);
      unsubscribe();
    });

    // 세팅
    setCurrentYear(year.enterYear + 2);
    setCurrentTerm(false);
  };

  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <Link to="/" style={{ textDecoration: "none" }}>
          <h1>대학 생활 기록 웹사이트</h1>
        </Link>
      </div>
      <div className={styles.bottom}>
        <IndexBar id={3} />
        <div className={styles.contents}>
          <Profile />
          <div className={styles.contentBox}>
            <div className={styles.contentTop}>
              <div className={styles.div1}>
                <div className={styles.line1}>
                  <div className={styles.circle}>입학 년도</div>
                  <div className={styles.textBox}>
                    {editYearE ? (
                      <SelectBox
                        title="입학년도"
                        yearObj={year}
                        reset={setEditE}
                      />
                    ) : (
                      <>
                        <span className={styles.date}>{year.enterYear}년</span>
                        <button
                          className={styles.editBtn}
                          onClick={() => setEditE(true)}
                        >
                          <BsPencilSquare className={styles.icon} />
                        </button>
                      </>
                    )}
                  </div>
                </div>
                <div className={styles.line2}>
                  <div className={styles.circle}>졸업 년도</div>
                  <div className={styles.textBox}>
                    {editYearG ? (
                      <SelectBox
                        title="졸업년도"
                        yearObj={year}
                        reset={setEditG}
                      />
                    ) : (
                      <>
                        <span className={styles.date}>
                          {year.graduationYear}년 {year.graduationMonth}월
                        </span>
                        <button
                          className={styles.editBtn}
                          onClick={() => setEditG(true)}
                        >
                          <BsPencilSquare className={styles.icon} />
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </div>
              <div className={styles.div2}>
                <div className={styles.left}>
                  <div className={styles.circle}>졸업 요건</div>
                </div>
                <div className={styles.todoContainer}>
                  <div>
                    {todo.map((todo) => {
                      return (
                        <Todo
                          todo={todo}
                          key={todo.id}
                          completeTodo={completeTodo}
                          deleteTodo={deleteTodo}
                        />
                      );
                    })}
                    {addTodo ? (
                      <NewTodo
                        todo={todo}
                        setTodo={setTodo}
                        setAddTodo={setAddTodo}
                      />
                    ) : undefined}
                    <button
                      className={styles.addBtn}
                      onClick={() => setAddTodo(true)}
                    >
                      <BsPlusCircle style={{ height: "20px", width: "20px" }} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.contentBottom}>
              <h2> 학기별 계획 </h2>
              <button className={styles.Btn} onClick={() => setModalOpen(true)}>
                <BsPlusCircle style={{ height: "18px", width: "18px" }} />
              </button>
              <Swiper slidesPerView={4}>
                {plan.map((plan) => {
                  return (
                    <SwiperSlide key={plan.id}>
                      {++top % 2 === 0 ? (
                        <PlanBottom
                          plan={plan}
                          setEditModal={setEditModal}
                          setEditPlan={setEditPlan}
                          deletePlan={deletePlan}
                        />
                      ) : (
                        <PlanTop
                          plan={plan}
                          setEditModal={setEditModal}
                          setEditPlan={setEditPlan}
                          deletePlan={deletePlan}
                        />
                      )}
                    </SwiperSlide>
                  );
                })}
              </Swiper>
              {modalOpen && (
                <PlanModal
                  setModalOpen={setModalOpen}
                  currentYear={currentYear}
                  setCurrentYear={setCurrentYear}
                  currentTerm={currentTerm}
                  setCurrentTerm={setCurrentTerm}
                  changeRemovable={changeRemovable}
                />
              )}
              {editModal && (
                <EditModal plan={editPlan} setEditModal={setEditModal} />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GraduationPage;

import React, { useEffect, useState } from "react";
import styles from "./GraduationPage.module.css";
import Profile from "./Components/Profile";
import IndexBar from "./Components/IndexBar";
import PlanBottom from "./Components/GraduationPage/PlanBottom";
import PlanTop from "./Components/GraduationPage/PlanTop";
import Todo from "./Components/GraduationPage/Todo";
import NewTodo from "./Components/GraduationPage/NewTodo";
import { BsPlusCircle, BsPencilSquare } from "react-icons/bs";
import SelectBox from "./Components/GraduationPage/SelectBox";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import PlanModal from "./Components/GraduationPage/PlanModal";
import EditModal from "./Components/GraduationPage/EditModal";

const GraduationPage = () => {
  // todo 데이터 (임시 데이터 2개)
  const [todo, setTodo] = useState([
    { id: Date.now(), value: "토익 900점 이상", completed: false },
    {
      id: Date.now() + 1,
      value: "졸업 프로젝트",
      completed: false,
    },
  ]);
  // 계획 데이터
  const [plan, setPlan] = useState([
    {
      id: 1,
      title: `2016학년도 1학기`,
      removable: false,
      plans: [
        { id: 11, text: "토익 900점 이상" },
        { id: 12, text: "컴활 자격증" },
      ],
    },
    { id: 2, title: `2016학년도 2학기`, removable: false, plans: [] },
    { id: 3, title: `2017학년도 1학기`, removable: false, plans: [] },
    { id: 4, title: `2017학년도 2학기`, removable: false, plans: [] },
  ]);

  const [addTodo, setAddTodo] = useState(false); // todo 추가 처리를 위한 state
  const [editYearE, setEditE] = useState(false); // 입학년도 수정을 위한 state
  const [editYearG, setEditG] = useState(false); // 졸업년도 수정을 위한 state
  const [enter, setEnter] = useState(2016); // 입학년도
  const [graduate, setGraduate] = useState(2022); // 졸업년도
  const [graduateM, setGraduateM] = useState(2); // 졸업 월
  const [modalOpen, setModalOpen] = useState(false); // 모달창 오픈 관리
  const [editPlan, setEditPlan] = useState({}); // 수정할 계획
  const [editModal, setEditModal] = useState(false); // 수정 모달 오픈 관리
  const [currentYear, setCurrentYear] = useState(enter + 2); // 현재 입력된 계획년도 저장용
  const [currentTerm, setCurrentTerm] = useState(false); // 현재 입력된 계획 학기 저장용
  let [top, setTop] = useState(0); // 계획 렌더링용 state

  /* --------------- useEffect --------------- */
  useEffect(() => {
    setTop(0);
  }, []);

  useEffect(() => {
    changeEnterYear();
  }, [enter]);

  /* --------------- todo 완료 처리 --------------- */
  const completeTodo = (id) => {
    let newTodo = todo.map((todo) => {
      if (todo.id === id) {
        todo.completed = !todo.completed;
      }
      return todo;
    });

    setTodo(newTodo);
  };

  /* --------------- todo 삭제 처리 --------------- */
  const deleteTodo = (id) => {
    let newTodo = todo.filter((todo) => todo.id !== id);
    setTodo(newTodo);
  };

  /* --------------- plan 삭제 처리 --------------- */
  const deletePlan = (id) => {
    let newPlan = plan.filter((plan) => plan.id !== id);
    setPlan(newPlan);

    if (currentTerm === false) {
      setCurrentYear((prev) => prev - 1);
      setCurrentTerm(true);
    } else {
      setCurrentTerm(false);
    }

    // 마지막 요소 삭제 가능하게 조정
    if (plan.length > 5) {
      plan[plan.length - 2].removable = true;
      console.log("true: ", plan[plan.length - 2].title);
    }
  };

  /* --------------- 입학년도 변경 시 --------------- */
  const changeEnterYear = () => {
    let n = 0;
    plan.map((plan) => {
      plan.title = `${enter + parseInt(n / 2)}학년도 ${(n % 2) + 1}학기`;
      n++;
    });
    setCurrentYear(enter + 2);
    setCurrentTerm(false);
  };

  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <h1>대학 생활 기록 웹사이트</h1>
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
                        year={enter}
                        setYear={setEnter}
                        reset={setEditE}
                      />
                    ) : (
                      <>
                        <span className={styles.date}>{enter}년</span>
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
                        year={graduate}
                        setYear={setGraduate}
                        month={graduateM}
                        setMonth={setGraduateM}
                        reset={setEditG}
                      />
                    ) : (
                      <>
                        <span className={styles.date}>
                          {graduate}년 {graduateM}월
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
                  plan={plan}
                  setPlan={setPlan}
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

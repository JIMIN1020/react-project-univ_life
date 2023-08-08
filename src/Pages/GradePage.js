import React, { useState, useRef, useEffect } from "react";
import styles from "./GradePage.module.css";
import Profile from "../Components/Profile";
import IndexBar from "../Components/IndexBar";
import { useSwipeable } from "react-swipeable";
import { Link } from "react-router-dom";
import { ResponsiveLine } from "@nivo/line";
import GeneralBox from "../Components/GradePage/GeneralBox";
import {
  collection,
  query,
  onSnapshot,
  orderBy,
  updateDoc,
  doc,
  getDocs,
  setDoc,
  getDoc,
  deleteDoc,
} from "firebase/firestore";
import { authService, dbService } from "../fbase";

const MyResponsiveLine = ({ data }) => (
  <ResponsiveLine
    data={data}
    margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
    xScale={{ type: "point" }}
    yScale={{
      type: "linear",
      min: "auto",
      max: "auto",
      stacked: true,
      reverse: false,
    }}
    yFormat=" >-.2f"
    axisTop={null}
    axisRight={null}
    axisBottom={{
      tickSize: 5,
      tickPadding: 5,
      tickRotation: 0,
      legend: "Your Grade",
      legendOffset: 36,
      legendPosition: "middle",
    }}
    axisLeft={{
      tickSize: 5,
      tickPadding: 5,
      tickRotation: 0,
      legend: "count",
      legendOffset: -40,
      legendPosition: "middle",
    }}
    pointSize={10}
    pointColor={{ theme: "background" }}
    pointBorderWidth={2}
    pointBorderColor={{ from: "serieColor" }}
    pointLabelYOffset={-12}
    useMesh={true}
    legends={[
      {
        anchor: "bottom-right",
        direction: "column",
        justify: false,
        translateX: 100,
        translateY: 0,
        itemsSpacing: 0,
        itemDirection: "left-to-right",
        itemWidth: 80,
        itemHeight: 20,
        itemOpacity: 0.75,
        symbolSize: 12,
        symbolShape: "circle",
        symbolBorderColor: "rgba(0, 0, 0, .5)",
        effects: [
          {
            on: "hover",
            style: {
              itemBackground: "rgba(0, 0, 0, .03)",
              itemOpacity: 1,
            },
          },
        ],
      },
    ]}
  />
);

const TodoItem = ({ text, isChecked, onCheck }) => {
  return (
    <div>
      <input type="checkbox" checked={isChecked} onChange={onCheck} />
      <span style={{ textDecoration: isChecked ? "line-through" : "none" }}>
        {text}
      </span>
    </div>
  );
};

const GradePage = () => {
  const storedGpaValue = localStorage.getItem("gpaValue");
  const initialGpaValue = storedGpaValue ? JSON.parse(storedGpaValue) : null;
  const [gpaValue, setGpaValue] = useState(initialGpaValue);

  const storedGpaValue2 = localStorage.getItem("gpaValue2");
  const initialGpaValue2 = storedGpaValue2 ? JSON.parse(storedGpaValue2) : null;
  const [gpaValue2, setGpaValue2] = useState(initialGpaValue2);

  const storedGpaValue3 = localStorage.getItem("gpaValue3");
  const initialGpaValue3 = storedGpaValue3 ? JSON.parse(storedGpaValue3) : null;
  const [gpaValue3, setGpaValue3] = useState(initialGpaValue3);

  const storedGpaValue4 = localStorage.getItem("gpaValue4");
  const initialGpaValue4 = storedGpaValue4 ? JSON.parse(storedGpaValue4) : null;
  const [gpaValue4, setGpaValue4] = useState(initialGpaValue4);

  const storedGpaValue5 = localStorage.getItem("gpaValue5");
  const initialGpaValue5 = storedGpaValue5 ? JSON.parse(storedGpaValue5) : null;
  const [gpaValue5, setGpaValue5] = useState(initialGpaValue5);

  const storedGpaValue6 = localStorage.getItem("gpaValue6");
  const initialGpaValue6 = storedGpaValue6 ? JSON.parse(storedGpaValue6) : null;
  const [gpaValue6, setGpaValue6] = useState(initialGpaValue6);

  const storedGpaValue7 = localStorage.getItem("gpaValue7");
  const initialGpaValue7 = storedGpaValue7 ? JSON.parse(storedGpaValue7) : null;
  const [gpaValue7, setGpaValue7] = useState(initialGpaValue7);

  const storedGpaValue8 = localStorage.getItem("gpaValue8");
  const initialGpaValue8 = storedGpaValue8 ? JSON.parse(storedGpaValue8) : null;
  const [gpaValue8, setGpaValue8] = useState(initialGpaValue8);

  const AddFirst = async () => {
    const docRef = doc(
      collection(dbService, "gradePage", `${authService.currentUser.uid}`, "gpaValue")
    );
    await setDoc(docRef, {
      first: gpaValue,
      second: gpaValue2,
      third: gpaValue3,
      fourth: gpaValue4,
      fifth: gpaValue5,
      sixth: gpaValue6,
      seventh: gpaValue7,
      eighth: gpaValue8,
    });
  };  

  useEffect(() => {
    getFirst();
  }, []);
  
  const getFirst = async () => {
    const q = query(
      collection(dbService, `gradePage/${authService.currentUser.uid}/gpaValue`),
      orderBy("createdAt", "desc")
    );
    const querySnapshot = await getDocs(q);
  
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      setGpaValue(data.first);
      setGpaValue2(data.second);
      setGpaValue3(data.third);
      setGpaValue4(data.fourth);
      setGpaValue5(data.fifth);
      setGpaValue6(data.sixth);
      setGpaValue7(data.seventh);
      setGpaValue8(data.eighth);
    });
  };  

  const handleAddFirstButtonClick = () => {
    AddFirst();
  };

  const handleGpaChange = (gpaValue) => {
    setGpaValue(gpaValue);
    localStorage.setItem("gpaValue", JSON.stringify(gpaValue));
  };
  
  const handleGpaChange2 = (gpaValue2) => {
  setGpaValue(gpaValue2);
  localStorage.setItem("gpaValue2", JSON.stringify(gpaValue2));
  };

  const handleGpaChange3 = (gpaValue3) => {
    setGpaValue3(gpaValue3);
    localStorage.setItem("gpaValue3", JSON.stringify(gpaValue3));
  };

  const handleGpaChange4 = (gpaValue4) => {
    setGpaValue4(gpaValue4);
    localStorage.setItem("gpaValue4", JSON.stringify(gpaValue4));
  };

  const handleGpaChange5 = (gpaValue5) => {
    setGpaValue5(gpaValue5);
    localStorage.setItem("gpaValue5", JSON.stringify(gpaValue5));
  };
  const handleGpaChange6 = (gpaValue6) => {
    setGpaValue6(gpaValue6);
    localStorage.setItem("gpaValue6", JSON.stringify(gpaValue6));
  };

  const handleGpaChange7 = (gpaValue7) => {
    setGpaValue7(gpaValue7);
    localStorage.setItem("gpaValue7", JSON.stringify(gpaValue7));
  };

  const handleGpaChange8 = (gpaValue8) => {
    setGpaValue8(gpaValue8);
    localStorage.setItem("gpaValue8", JSON.stringify(gpaValue8));
  };

  const [isDiv2Visible, setDiv2Visible] = useState(false);
  const [isDiv3Visible, setDiv3Visible] = useState(false);
  const [isDiv4Visible, setDiv4Visible] = useState(false);
  const [isDiv5Visible, setDiv5Visible] = useState(false);
  const [isDiv6Visible, setDiv6Visible] = useState(false);
  const [isDiv7Visible, setDiv7Visible] = useState(false);
  const [isDiv8Visible, setDiv8Visible] = useState(false);
  const [isDiv9Visible, setDiv9Visible] = useState(false);
  const [subjectInput, setSubjectInput] = useState("");
  const [creditInput, setCreditInput] = useState("1");
  const [gradeInput, setGradeInput] = useState("A+");
  const [div2Contents, setDiv2Contents] = useState([]);
  const [div3Contents, setDiv3Contents] = useState([]);
  const [div4Contents, setDiv4Contents] = useState([]);
  const [div5Contents, setDiv5Contents] = useState([]);
  const [div6Contents, setDiv6Contents] = useState([]);
  const [div7Contents, setDiv7Contents] = useState([]);
  const [div8Contents, setDiv8Contents] = useState([]);
  const [div9Contents, setDiv9Contents] = useState([]);

  const [addButtonClickCount, setAddButtonClickCount] = useState(0);
  const div6Ref = useRef(null);
  const contentBoxRef = useRef(null);

  const data = [
    {
      id: "grade",
      color: "hsl(318, 70%, 50%)",
      data: [
        {
          x: "1학기",
          y: gpaValue,
        },
        {
          x: "2학기",
          y: gpaValue2,
        },
        {
          x: "3학기",
          y: gpaValue3,
        },
        {
          x: "4학기",
          y: gpaValue4,
        },
        {
          x: "5학기",
          y: gpaValue5,
        },
        {
          x: "6학기",
          y: gpaValue6,
        },
        {
          x: "7학기",
          y: gpaValue7,
        },
        {
          x: "8학기",
          y: gpaValue8,
        },
      ],
    },
  ];

  useEffect(() => {
    const handleResize = () => {
      if (div6Ref.current && contentBoxRef.current) {
        const contentBoxWidth = contentBoxRef.current.offsetWidth;
        const div6Width = div6Ref.current.offsetWidth;

        if (div6Width > contentBoxWidth) {
          contentBoxRef.current.scrollLeft = div6Width - contentBoxWidth;
        }
      }
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleAddButtonClick = () => {
    if (addButtonClickCount === 0) {
      setDiv2Visible(true);
    } else if (addButtonClickCount === 1) {
      setDiv3Visible(true);
    } else if (addButtonClickCount === 2) {
      setDiv4Visible(true);
    } else if (addButtonClickCount === 3) {
      setDiv5Visible(true);
    } else if (addButtonClickCount === 4) {
      setDiv6Visible(true);
    } else if (addButtonClickCount === 5) {
      setDiv7Visible(true);
    } else if (addButtonClickCount === 6) {
      setDiv8Visible(true);
    } else if (addButtonClickCount === 7) {
      setDiv9Visible(true);
    }
    setAddButtonClickCount(addButtonClickCount + 1);

    // Scroll left
    contentBoxRef.current.scrollLeft -= 200;

    // Scroll right
    contentBoxRef.current.scrollLeft += 200;
  };

  const handleSubjectInputChange = (event) => {
    setSubjectInput(event.target.value);
  };

  const handleCreditInputChange = (event) => {
    setCreditInput(event.target.value);
  };

  const handleGradeInputChange = (event) => {
    setGradeInput(event.target.value);
  };

  const handleSubjectInputEnter = (event) => {
    if (event.key === "Enter" && subjectInput.trim() !== "") {
      if (isDiv2Visible) {
        addSubject();
      }
    }
  };

  const addSubject = () => {
    const newSubject = `${subjectInput} - ${gradeInput}(${creditInput}학점)`;
    const credit = parseInt(creditInput);
    const subjects = Array.from({ length: credit }, () => newSubject);

    setDiv2Contents((prevContents) => prevContents.concat(subjects));
    setSubjectInput("");
    setCreditInput("1");
    setGradeInput("A+");
  };

  const calculateTotalCredits = () => {
    let totalCredits = 0;

    if (isDiv2Visible) totalCredits += { calculateTotalCredits };
    if (isDiv3Visible) totalCredits += { calculateTotalCredits };
    if (isDiv4Visible) totalCredits += { calculateTotalCredits };
    if (isDiv5Visible) totalCredits += { calculateTotalCredits };
    if (isDiv6Visible) totalCredits += { calculateTotalCredits };
    if (isDiv7Visible) totalCredits += { calculateTotalCredits };
    if (isDiv8Visible) totalCredits += { calculateTotalCredits };
    if (isDiv9Visible)
      totalCredits += parseInt(creditInput) * div9Contents.length;

    return totalCredits;
  };

  const swipeHandlers = useSwipeable({
    onSwipedUp: () => {
      if (div6Ref.current) {
        div6Ref.current.scrollLeft += 200;
      }
    },
    onSwipedDown: () => {
      if (div6Ref.current) {
        div6Ref.current.scrollLeft -= 200;
      }
    },
  });

  const [todoInput, setTodoInput] = useState("");
  const [todos, setTodos] = useState([]);

  const handleTodoInputChange = (event) => {
    setTodoInput(event.target.value);
  };

  const handleAddTodo = () => {
    if (todoInput.trim() !== "") {
      setTodos((prevTodos) => [
        ...prevTodos,
        { text: todoInput, isChecked: false },
      ]);
      setTodoInput("");
    }
  };

  const handleTodoCheck = (index) => {
    setTodos((prevTodos) => {
      const updatedTodos = [...prevTodos];
      updatedTodos[index].isChecked = !updatedTodos[index].isChecked;
      return updatedTodos;
    });
  };

  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <Link to="/" style={{ textDecoration: "none" }}>
          <h1>대학 생활 기록 웹사이트</h1>
        </Link>
      </div>
      <div className={styles.bottom}>
        <IndexBar id={1} />
        <div className={styles.contents}>
          <Profile />
          <div
            className={styles.contentBox}
            {...swipeHandlers}
            ref={contentBoxRef}
          >
            <div className={styles.contentTop}>
              <div className={styles.div1}>
                <div className={styles.todoList}>
                  <div className={styles.todoInput}>
                    <h3>오늘의 계획</h3>
                    <input
                      type="text"
                      placeholder="할 일을 입력하세요"
                      value={todoInput}
                      onChange={handleTodoInputChange}
                    />
                    <button onClick={handleAddTodo}>추가</button>
                  </div>
                  <div className={styles.todos}>
                    {todos.map((todo, index) => (
                      <TodoItem
                        key={index}
                        text={todo.text}
                        isChecked={todo.isChecked}
                        onCheck={() => handleTodoCheck(index)}
                      />
                    ))}
                  </div>
                </div>
                <div className={styles.div10}>
                  <h3>성적 그래프</h3>
                  <div
                    style={{
                      height: "370px",
                      width: "100%",
                      marginTop: "-50px",
                    }}
                  >
                    <MyResponsiveLine data={data} 
                    gpaValue={gpaValue} 
                    gpaValue2={gpaValue2}
                    gpaValue3={gpaValue3}
                    gpaValue4={gpaValue4}
                    gpaValue5={gpaValue5}
                    gpaValue6={gpaValue6}
                    gpaValue7={gpaValue7}
                    gpaValue8={gpaValue8} />

                  </div>
                </div>
                <div className={styles.div1Contents}>
                  <div className={styles.label}>
                  <button onClick={handleAddFirstButtonClick}>Save First Data</button>
                    {"세부 성적 입력란(성적 입력이 끝나면 저장 버튼을 눌러주세요.)"}
                  </div>
                  <div className={styles.div2}>
                  {<GeneralBox onGpaChange={handleGpaChange} />}
                  </div>
                  <div className={styles.div3}>
                  {<GeneralBox onGpaChange={handleGpaChange2}/>}
                  </div>
                  <div className={styles.div4}>
                  {<GeneralBox onGpaChange={handleGpaChange3}/>}
                  </div>
                  <div className={styles.div5}>
                  {<GeneralBox onGpaChange={handleGpaChange4}/>}
                  </div>
                  <div className={styles.div6}>
                  {<GeneralBox onGpaChange={handleGpaChange5}/>}
                  </div>
                  <div className={styles.div7}>
                  {<GeneralBox onGpaChange={handleGpaChange6}/>}
                  </div>
                  <div className={styles.div8}>
                  {<GeneralBox onGpaChange={handleGpaChange7}/>}
                  </div>
                  <div className={styles.div9}>
                  {<GeneralBox onGpaChange={handleGpaChange8}/>}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GradePage;
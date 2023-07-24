import React, { useState, useRef, useEffect } from "react";
import styles from "./GradePage.module.css";
import Profile from "./Components/Profile";
import IndexBar from "./Components/IndexBar";
import { useSwipeable } from "react-swipeable";
import Box2 from "./Components/GradePage/Box2";
import Box3 from "./Components/GradePage/Box3";
import Box4 from "./Components/GradePage/Box4";
import Box5 from "./Components/GradePage/Box5";
import Box6 from "./Components/GradePage/Box6";
import Box7 from "./Components/GradePage/Box7";
import Box8 from "./Components/GradePage/Box8";
import Box9 from "./Components/GradePage/Box9";

const GradePage = () => {
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
    const totalCredits =
      div2Contents.length +
      div3Contents.length +
      div4Contents.length +
      div5Contents.length +
      div6Contents.length +
      div7Contents.length +
      div8Contents.length +
      div9Contents.length;

    return totalCredits;
  };

  const calculateGPA = () => {
    const subjects = [
      ...div2Contents,
      ...div3Contents,
      ...div4Contents,
      ...div5Contents,
      ...div6Contents,
      ...div7Contents,
      ...div8Contents,
      ...div9Contents,
    ];

    let totalGradePoints = 0;
    let totalCredits = 0;

    for (const subject of subjects) {
      const credit = parseInt(subject.credit);
      const grade = parseFloat(subject.grade);

      totalGradePoints += credit * grade;
      totalCredits += credit;
    }

    if (totalCredits === 0) {
      return 0;
    }

    const gpa = totalGradePoints / totalCredits;
    return gpa.toFixed(2);
  };

  const swipeHandlers = useSwipeable({
    onSwipedLeft: () => {
      if (div6Ref.current) {
        div6Ref.current.scrollLeft += 200;
      }
    },
    onSwipedRight: () => {
      if (div6Ref.current) {
        div6Ref.current.scrollLeft -= 200;
      }
    },
  });

  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <h1>대학 생활 기록 웹사이트</h1>
      </div>
      <div className={styles.bottom}>
        <IndexBar id={1}/>
        <div className={styles.contents}>
          <Profile />
          <div className={styles.contentBox} ref={contentBoxRef}>
            <div className={styles.contentTop}>
              <div className={styles.div1}>
                <div className={styles.div1Label}>
                  <div>이수 학점: {calculateTotalCredits()}</div>
                  <div>평균 학점: {calculateGPA()}</div>
                </div>
                <div className={styles.div1Contents}>
                  <div className={styles.label}>
                    {"세부 성적 입력란(8학기까지 입력 가능합니다.)"}
                    <button onClick={handleAddButtonClick}>추가하기</button>
                  </div>
                  {/* Div2 컴포넌트 사용 */}
                  {isDiv2Visible && <Box2 />}
                  {isDiv3Visible && <Box3 />}
                  {isDiv4Visible && <Box4 />}
                  {isDiv5Visible && <Box5 />}
                  {isDiv6Visible && <Box6 />}
                  {isDiv7Visible && <Box7 />}
                  {isDiv8Visible && <Box8 />}
                  {isDiv9Visible && <Box9 />}
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

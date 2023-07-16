import React, { useState, useRef, useEffect } from "react";
import styles from "./GradePage.module.css";
import Profile from "./Components/Profile";
import IndexBar from "./Components/IndexBar";
import PlanBottom from "./Components/GraduationPage/PlanBottom";
import PlanTop from "./Components/GraduationPage/PlanTop";
import { useSwipeable } from "react-swipeable";

const GradePage = () => {
  const [isDiv2Visible, setDiv2Visible] = useState(false);
  const [subjectInput, setSubjectInput] = useState("");
  const [creditInput, setCreditInput] = useState("1");
  const [gradeInput, setGradeInput] = useState("A+");
  const [div2Contents, setDiv2Contents] = useState([]);
  const [div3Contents, setDiv3Contents] = useState([]);
  const [div4Contents, setDiv4Contents] = useState([]);
  const [div5Contents, setDiv5Contents] = useState([]);
  const [div6Contents, setDiv6Contents] = useState([]);
  const [div7Contents, setDiv7Contents] = useState([]);
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
      setDiv3Contents([]);
    } else if (addButtonClickCount === 2) {
      setDiv4Contents([]);
    } else if (addButtonClickCount === 3) {
      setDiv5Contents([]);
    } else if (addButtonClickCount === 4) {
      setDiv6Contents([]);
    } else if (addButtonClickCount === 5) {
      setDiv7Contents([]);
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
        addSubjectToDiv2();
      } else if (addButtonClickCount === 1) {
        addSubjectToDiv3();
      } else if (addButtonClickCount === 2) {
        addSubjectToDiv4();
      } else if (addButtonClickCount === 3) {
        addSubjectToDiv5();
      } else if (addButtonClickCount === 4) {
        addSubjectToDiv6();
      } else if (addButtonClickCount === 5) {
        addSubjectToDiv7();
      }
    }
  };

  const addSubjectToDiv2 = () => {
    const newSubject = `${subjectInput} - ${gradeInput}(${creditInput}학점)`;
    setDiv2Contents((prevContents) => [...prevContents, newSubject]);
    setSubjectInput("");
    setCreditInput("1");
    setGradeInput("A+");
  };

  const addSubjectToDiv3 = () => {
    const newSubject = `${subjectInput} - ${gradeInput}(${creditInput}학점)`;
    setDiv3Contents((prevContents) => [...prevContents, newSubject]);
    setSubjectInput("");
    setCreditInput("1");
    setGradeInput("A+");
  };

  const addSubjectToDiv4 = () => {
    const newSubject = `${subjectInput} - ${gradeInput}(${creditInput}학점)`;
    setDiv4Contents((prevContents) => [...prevContents, newSubject]);
    setSubjectInput("");
    setCreditInput("1");
    setGradeInput("A+");
  };

  const addSubjectToDiv5 = () => {
    const newSubject = `${subjectInput} - ${gradeInput}(${creditInput}학점)`;
    setDiv5Contents((prevContents) => [...prevContents, newSubject]);
    setSubjectInput("");
    setCreditInput("1");
    setGradeInput("A+");
  };

  const addSubjectToDiv6 = () => {
    const newSubject = `${subjectInput} - ${gradeInput}(${creditInput}학점)`;
    setDiv6Contents((prevContents) => [...prevContents, newSubject]);
    setSubjectInput("");
    setCreditInput("1");
    setGradeInput("A+");
  };

  const addSubjectToDiv7 = () => {
    const newSubject = `${subjectInput} - ${gradeInput}(${creditInput}학점)`;
    setDiv7Contents((prevContents) => [...prevContents, newSubject]);
    setSubjectInput("");
    setCreditInput("1");
    setGradeInput("A+");
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
        <IndexBar />
        <div className={styles.contents}>
          <Profile />
          <div className={styles.contentBox} ref={contentBoxRef}>
            <div className={styles.contentTop}>
              <div className={styles.div1}>
                <div className={styles.div1Contents}>
                  <div className={styles.label}>
                    {"세부 성적 입력란(8학기까지 입력 가능합니다.)"}
                  </div>
                  {isDiv2Visible && (
                    <div className={styles.div2}>
                      <div className={styles.div2Contents}>
                        <div className={styles.div2Subject}>
                          <input
                            type="text"
                            value={subjectInput}
                            onChange={handleSubjectInputChange}
                            onKeyDown={handleSubjectInputEnter}
                            placeholder="과목을 입력하세요"
                          />
                          <select
                            value={creditInput}
                            onChange={handleCreditInputChange}
                          >
                            <option value="1">1학점</option>
                            <option value="2">2학점</option>
                            <option value="3">3학점</option>
                            <option value="4">4학점</option>
                          </select>
                          <select
                            value={gradeInput}
                            onChange={handleGradeInputChange}
                          >
                            <option value="A+">A+</option>
                            <option value="A">A</option>
                            <option value="A-">A-</option>
                            <option value="B+">B+</option>
                            <option value="B">B</option>
                            <option value="B-">B-</option>
                            <option value="C+">C+</option>
                            <option value="C">C</option>
                            <option value="C-">C-</option>
                            <option value="D+">D+</option>
                            <option value="D">D</option>
                            <option value="D-">D-</option>
                            <option value="F">F</option>
                          </select>
                          <button onClick={addSubjectToDiv2}>추가</button>
                        </div>
                        {div2Contents.map((subject, index) => (
                          <div key={index} className={styles.div2Subject}>
                            {subject}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                  {addButtonClickCount >= 2 && (
                    <div className={styles.div3} style={{ marginLeft: "250px" }}>
                      <div className={styles.div3Contents}>
                        <div className={styles.div3Subject}>
                          <input
                            type="text"
                            value={subjectInput}
                            onChange={handleSubjectInputChange}
                            onKeyDown={handleSubjectInputEnter}
                            placeholder="과목을 입력하세요"
                          />
                          <select
                            className={styles.creditSelect}
                            value={creditInput}
                            onChange={handleCreditInputChange}
                          >
                            <option value="1">1학점</option>
                            <option value="2">2학점</option>
                            <option value="3">3학점</option>
                          </select>
                          <select
                            className={styles.gradeSelect}
                            value={gradeInput}
                            onChange={handleGradeInputChange}
                          >
                            <option value="A+">A+</option>
                            <option value="A0">A0</option>
                            <option value="A-">A-</option>
                            <option value="B+">B+</option>
                            <option value="B0">B0</option>
                            <option value="B-">B-</option>
                            <option value="C+">C+</option>
                            <option value="C0">C0</option>
                            <option value="C-">C-</option>
                            <option value="D+">D+</option>
                            <option value="D0">D0</option>
                            <option value="D-">D-</option>
                            <option value="P">P</option>
                            <option value="F">F</option>
                          </select>
                          <button className={styles.enterButton} onClick={addSubjectToDiv3}>
                            입력
                          </button>
                        </div>
                        {div3Contents.map((subject, index) => (
                          <div key={index} className={styles.div3Subject}>
                            {subject}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                  {addButtonClickCount >= 3 && (
                    <div className={styles.div4} style={{ marginLeft: "500px" }}>
                      <div className={styles.div4Contents}>
                        <div className={styles.div4Subject}>
                          <input
                            type="text"
                            value={subjectInput}
                            onChange={handleSubjectInputChange}
                            onKeyDown={handleSubjectInputEnter}
                            placeholder="과목을 입력하세요"
                          />
                          <select
                            className={styles.creditSelect}
                            value={creditInput}
                            onChange={handleCreditInputChange}
                          >
                            <option value="1">1학점</option>
                            <option value="2">2학점</option>
                            <option value="3">3학점</option>
                          </select>
                          <select
                            className={styles.gradeSelect}
                            value={gradeInput}
                            onChange={handleGradeInputChange}
                          >
                            <option value="A+">A+</option>
                            <option value="A0">A0</option>
                            <option value="A-">A-</option>
                            <option value="B+">B+</option>
                            <option value="B0">B0</option>
                            <option value="B-">B-</option>
                            <option value="C+">C+</option>
                            <option value="C0">C0</option>
                            <option value="C-">C-</option>
                            <option value="D+">D+</option>
                            <option value="D0">D0</option>
                            <option value="D-">D-</option>
                            <option value="P">P</option>
                            <option value="F">F</option>
                          </select>
                          <button className={styles.enterButton} onClick={addSubjectToDiv4}>
                            입력
                          </button>
                        </div>
                        {div4Contents.map((subject, index) => (
                          <div key={index} className={styles.div4Subject}>
                            {subject}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                  {addButtonClickCount >= 4 && (
                    <div className={styles.div5} style={{ marginLeft: "750px" }}>
                      <div className={styles.div5Contents}>
                        <div className={styles.div5Subject}>
                          <input
                            type="text"
                            value={subjectInput}
                            onChange={handleSubjectInputChange}
                            onKeyDown={handleSubjectInputEnter}
                            placeholder="과목을 입력하세요"
                          />
                          <select
                            className={styles.creditSelect}
                            value={creditInput}
                            onChange={handleCreditInputChange}
                          >
                            <option value="1">1학점</option>
                            <option value="2">2학점</option>
                            <option value="3">3학점</option>
                          </select>
                          <select
                            className={styles.gradeSelect}
                            value={gradeInput}
                            onChange={handleGradeInputChange}
                          >
                            <option value="A+">A+</option>
                            <option value="A0">A0</option>
                            <option value="A-">A-</option>
                            <option value="B+">B+</option>
                            <option value="B0">B0</option>
                            <option value="B-">B-</option>
                            <option value="C+">C+</option>
                            <option value="C0">C0</option>
                            <option value="C-">C-</option>
                            <option value="D+">D+</option>
                            <option value="D0">D0</option>
                            <option value="D-">D-</option>
                            <option value="P">P</option>
                            <option value="F">F</option>
                          </select>
                          <button className={styles.enterButton} onClick={addSubjectToDiv5}>
                            입력
                          </button>
                        </div>
                        {div5Contents.map((subject, index) => (
                          <div key={index} className={styles.div5Subject}>
                            {subject}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                  {addButtonClickCount >= 5 && (
                    <div className={styles.div6} style={{ marginLeft: "1000px" }} ref={div6Ref} {...swipeHandlers}>
                      <div className={styles.div6Contents}>
                        <div className={styles.div6Subject}>
                          <input
                            type="text"
                            value={subjectInput}
                            onChange={handleSubjectInputChange}
                            onKeyDown={handleSubjectInputEnter}
                            placeholder="과목을 입력하세요"
                          />
                          <select
                            className={styles.creditSelect}
                            value={creditInput}
                            onChange={handleCreditInputChange}
                          >
                            <option value="1">1학점</option>
                            <option value="2">2학점</option>
                            <option value="3">3학점</option>
                          </select>
                          <select
                            className={styles.gradeSelect}
                            value={gradeInput}
                            onChange={handleGradeInputChange}
                          >
                            <option value="A+">A+</option>
                            <option value="A0">A0</option>
                            <option value="A-">A-</option>
                            <option value="B+">B+</option>
                            <option value="B0">B0</option>
                            <option value="B-">B-</option>
                            <option value="C+">C+</option>
                            <option value="C0">C0</option>
                            <option value="C-">C-</option>
                            <option value="D+">D+</option>
                            <option value="D0">D0</option>
                            <option value="D-">D-</option>
                            <option value="P">P</option>
                            <option value="F">F</option>
                          </select>
                          <button className={styles.enterButton} onClick={addSubjectToDiv6}>
                            입력
                          </button>
                        </div>
                        {div6Contents.map((subject, index) => (
                          <div key={index} className={styles.div6Subject}>
                            {subject}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                  {addButtonClickCount >= 6 && (
  <div className={styles.div7} style={{ marginLeft: "1250px" }}>
    <div className={styles.div7Contents}>
      <div className={styles.div7Subject}>
        <input
          type="text"
          value={subjectInput}
          onChange={handleSubjectInputChange}
          onKeyDown={handleSubjectInputEnter}
          placeholder="과목을 입력하세요"
        />
        <select
          className={styles.creditSelect}
          value={creditInput}
          onChange={handleCreditInputChange}
        >
          <option value="1">1학점</option>
          <option value="2">2학점</option>
          <option value="3">3학점</option>
        </select>
        <select
          className={styles.gradeSelect}
          value={gradeInput}
          onChange={handleGradeInputChange}
        >
          <option value="A+">A+</option>
          <option value="A0">A0</option>
          <option value="A-">A-</option>
          <option value="B+">B+</option>
          <option value="B0">B0</option>
          <option value="B-">B-</option>
          <option value="C+">C+</option>
          <option value="C0">C0</option>
          <option value="C-">C-</option>
          <option value="D+">D+</option>
          <option value="D0">D0</option>
          <option value="D-">D-</option>
          <option value="P">P</option>
          <option value="F">F</option>
        </select>
        <button className={styles.enterButton} onClick={addSubjectToDiv7}>
          입력
        </button>
      </div>
      {div7Contents.map((subject, index) => (
        <div key={index} className={styles.div7Subject}>
          {subject}
        </div>
      ))}
    </div>
    
  </div>
  
)}
{addButtonClickCount >= 7 && (
                    <div className={styles.div8} style={{ marginLeft: "1500px" }} ref={div6Ref} {...swipeHandlers}>
                      <div className={styles.div68Contents}>
                        <div className={styles.div8Subject}>
                          <input
                            type="text"
                            value={subjectInput}
                            onChange={handleSubjectInputChange}
                            onKeyDown={handleSubjectInputEnter}
                            placeholder="과목을 입력하세요"
                          />
                          <select
                            className={styles.creditSelect}
                            value={creditInput}
                            onChange={handleCreditInputChange}
                          >
                            <option value="1">1학점</option>
                            <option value="2">2학점</option>
                            <option value="3">3학점</option>
                          </select>
                          <select
                            className={styles.gradeSelect}
                            value={gradeInput}
                            onChange={handleGradeInputChange}
                          >
                            <option value="A+">A+</option>
                            <option value="A0">A0</option>
                            <option value="A-">A-</option>
                            <option value="B+">B+</option>
                            <option value="B0">B0</option>
                            <option value="B-">B-</option>
                            <option value="C+">C+</option>
                            <option value="C0">C0</option>
                            <option value="C-">C-</option>
                            <option value="D+">D+</option>
                            <option value="D0">D0</option>
                            <option value="D-">D-</option>
                            <option value="P">P</option>
                            <option value="F">F</option>
                          </select>
                          <button className={styles.enterButton} onClick={addSubjectToDiv6}>
                            입력
                          </button>
                        </div>
                        {div6Contents.map((subject, index) => (
                          <div key={index} className={styles.div8Subject}>
                            {subject}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                {addButtonClickCount >= 8 && (
                    <div className={styles.div9} style={{ marginLeft: "1750px" }} ref={div6Ref} {...swipeHandlers}>
                      <div className={styles.div9Contents}>
                        <div className={styles.div9Subject}>
                          <input
                            type="text"
                            value={subjectInput}
                            onChange={handleSubjectInputChange}
                            onKeyDown={handleSubjectInputEnter}
                            placeholder="과목을 입력하세요"
                          />
                          <select
                            className={styles.creditSelect}
                            value={creditInput}
                            onChange={handleCreditInputChange}
                          >
                            <option value="1">1학점</option>
                            <option value="2">2학점</option>
                            <option value="3">3학점</option>
                          </select>
                          <select
                            className={styles.gradeSelect}
                            value={gradeInput}
                            onChange={handleGradeInputChange}
                          >
                            <option value="A+">A+</option>
                            <option value="A0">A0</option>
                            <option value="A-">A-</option>
                            <option value="B+">B+</option>
                            <option value="B0">B0</option>
                            <option value="B-">B-</option>
                            <option value="C+">C+</option>
                            <option value="C0">C0</option>
                            <option value="C-">C-</option>
                            <option value="D+">D+</option>
                            <option value="D0">D0</option>
                            <option value="D-">D-</option>
                            <option value="P">P</option>
                            <option value="F">F</option>
                          </select>
                          <button className={styles.enterButton} onClick={addSubjectToDiv6}>
                            입력
                          </button>
                        </div>
                        {div6Contents.map((subject, index) => (
                          <div key={index} className={styles.div9Subject}>
                            {subject}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                  </div>
              </div>
            </div>
            <div className={styles.contentBottom}></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GradePage;

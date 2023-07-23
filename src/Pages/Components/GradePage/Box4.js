import React, { useState } from "react";
import styles from "./Box.module.css";

const Box4 = () => {
  const [subjectInput, setSubjectInput] = useState("");
  const [creditInput, setCreditInput] = useState("1");
  const [gradeInput, setGradeInput] = useState("A+");
  const [div4Contents, setDiv4Contents] = useState([]);

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
      addSubjectToDiv4();
    }
  };

  const addSubjectToDiv4 = () => {
    const newSubject = `${subjectInput} - ${gradeInput}(${creditInput}학점)`;
  
    const isSubjectExists = div4Contents.some(
      (subject) => subject.startsWith(`${subjectInput} - ${gradeInput}`)
    );
  
    if (!isSubjectExists) {
      setDiv4Contents((prevContents) => prevContents.concat(newSubject));
    }
  
    setSubjectInput("");
    setCreditInput("1");
    setGradeInput("A+");
  };
  
  

  return (
    <div className={styles.div4}>
      <div className={styles.div4Contents}>
        <div className={styles.div4Subject}>
          <input
            type="text"
            value={subjectInput}
            onChange={handleSubjectInputChange}
            onKeyDown={handleSubjectInputEnter}
            placeholder="과목을 입력하세요"
          />
          <select value={creditInput} onChange={handleCreditInputChange}>
            <option value="1">1학점</option>
            <option value="2">2학점</option>
            <option value="3">3학점</option>
          </select>
          <select value={gradeInput} onChange={handleGradeInputChange}>
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
            <option value="D">D-</option>
            <option value="F">F</option>
          </select>
          <button onClick={addSubjectToDiv4}>추가</button>
        </div>
        {div4Contents.map((subject, index) => (
          <div key={index} className={styles.div4Subject}>
            {subject}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Box4;

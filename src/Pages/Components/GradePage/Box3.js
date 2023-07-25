import React, { useState } from "react";
import styles from "./Box.module.css";

const Box3 = () => {
  const [subjectInput, setSubjectInput] = useState("");
  const [creditInput, setCreditInput] = useState("1");
  const [gradeInput, setGradeInput] = useState("A+");
  const [div3Contents, setDiv3Contents] = useState([]);

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
      addSubjectToDiv3();
    }
  };

  const addSubjectToDiv3 = () => {
    const newSubject = `${subjectInput} - ${gradeInput}(${creditInput}학점)`;

    const isSubjectExists = div3Contents.some(
      (subject) => subject.startsWith(`${subjectInput} - ${gradeInput}`)
    );

    if (!isSubjectExists) {
      setDiv3Contents((prevContents) => prevContents.concat(newSubject));
    }

    setSubjectInput("");
    setCreditInput("1");
    setGradeInput("A+");
  };

  const calculateTotalCredits = () => {
    let totalCredits = 0;

    div3Contents.forEach((subject) => {
      const credit = parseInt(subject.match(/\((\d+)학점\)/)[1]);
      totalCredits += credit;
    });

    return totalCredits;
  };

  const calculateGPA = () => {
    let totalGradePoints = 0;
    let totalCredits = 0;

    div3Contents.forEach((subject) => {
      const credit = parseInt(subject.match(/\((\d+)학점\)/)[1]);
      const grade = convertGradeToValue(subject.match(/- ([A-F][+\-]?)/)[1]);

      totalGradePoints += credit * grade;
      totalCredits += credit;
    });

    if (totalCredits === 0) {
      return 0;
    }

    const gpa = totalGradePoints / totalCredits;
    return gpa.toFixed(2);
  };

  const convertGradeToValue = (grade) => {
    switch (grade) {
      case "A+":
        return 4.5;
      case "A":
        return 4.0;
      case "A-":
        return 3.7;
      case "B+":
        return 3.3;
      case "B":
        return 3.0;
      case "B-":
        return 2.7;
      case "C+":
        return 2.3;
      case "C":
        return 2.0;
      case "C-":
        return 1.7;
      case "D+":
        return 1.3;
      case "D":
        return 1.0;
      case "D-":
        return 0.7;
      case "F":
        return 0.0;
      default:
        return 0.0;
    }
  };

  return (
    <div className={styles.div3}>
      <div className={styles.div3Contents}>
        <div className={styles.div3Subject}>
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
            <option value="D-">D-</option>
            <option value="F">F</option>
          </select>
          <button onClick={addSubjectToDiv3}>추가</button>
        </div>
        {div3Contents.map((subject, index) => (
          <div key={index} className={styles.div3Subject}>
            {subject}
          </div>
        ))}
      </div>
      <div>이수 학점: {calculateTotalCredits()}</div>
      <div>평균 학점: {calculateGPA()}</div>
    </div>
  );
};

export default Box3;

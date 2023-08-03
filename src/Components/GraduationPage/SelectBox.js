import React from "react";
import { BsCheck2 } from "react-icons/bs";
import styles from "./SelectBox.module.css";
import { doc, updateDoc } from "firebase/firestore";
import { authService, dbService } from "../../fbase";

const SelectBox = ({ title, yearObj, reset }) => {
  const handleChange = async (e) => {
    // 문서 가져오기
    const docRef = doc(
      dbService,
      `graduationPage/${authService.currentUser.uid}/years`,
      "0"
    );

    if (title === "입학년도") {
      await updateDoc(docRef, { enterYear: parseInt(e.target.value) });
    } else if (title === "졸업년도") {
      await updateDoc(docRef, { graduationYear: parseInt(e.target.value) });
    }
  };
  const handleChangeMonth = async (e) => {
    // 문서 가져오기
    const docRef = doc(
      dbService,
      `graduationPage/${authService.currentUser.uid}/years`,
      "0"
    );

    await updateDoc(docRef, { graduationMonth: parseInt(e.target.value) });
  };
  let options;

  switch (title) {
    case "입학년도":
      options = OPTIONS_E;
      break;
    case "졸업년도":
      options = OPTIONS_G;
      break;
    default:
      break;
  }
  return (
    <>
      {title === "졸업년도" ? (
        <>
          <select
            className={styles.selectBox}
            onChange={handleChange}
            key={yearObj.graduationYear}
            defaultValue={yearObj.graduationYear}
          >
            {options.map((option) => {
              return <option value={option.value}>{option.name}</option>;
            })}
          </select>
          <select
            className={styles.selectBox2}
            onChange={handleChangeMonth}
            key={yearObj.graduationMonth}
            defaultValue={yearObj.graduationMonth}
          >
            <option value={2} defaultValue={yearObj.graduationMonth === 2}>
              2월
            </option>
            <option value={8} defaultValue={yearObj.graduationMonth === 8}>
              8월
            </option>
          </select>
        </>
      ) : (
        <select
          className={styles.selectBox}
          onChange={handleChange}
          key={yearObj.enterYear}
          defaultValue={yearObj.enterYear}
        >
          {options.map((option) => {
            return <option value={option.value}>{option.name}</option>;
          })}
        </select>
      )}
      <button className={styles.okBtn} onClick={() => reset(false)}>
        <BsCheck2 className={styles.icon} />
      </button>
    </>
  );
};

export default SelectBox;

const OPTIONS_E = [
  { value: 2016, name: "2016년" },
  { value: 2017, name: "2017년" },
  { value: 2018, name: "2018년" },
  { value: 2019, name: "2019년" },
  { value: 2020, name: "2020년" },
  { value: 2021, name: "2021년" },
  { value: 2022, name: "2022년" },
  { value: 2023, name: "2023년" },
];

const OPTIONS_G = [
  { value: 2020, name: "2020년" },
  { value: 2021, name: "2021년" },
  { value: 2022, name: "2022년" },
  { value: 2023, name: "2023년" },
  { value: 2024, name: "2024년" },
  { value: 2025, name: "2025년" },
  { value: 2026, name: "2026년" },
  { value: 2027, name: "2027년" },
  { value: 2028, name: "2028년" },
  { value: 2029, name: "2029년" },
  { value: 2030, name: "2030년" },
];

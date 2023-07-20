import React from "react";
import { BsCheck2 } from "react-icons/bs";
import styles from "./SelectBox.module.css";

const SelectBox = ({ title, year, setYear, month, setMonth, reset }) => {
  const handleChange = (e) => {
    setYear(e.target.value);
  };
  const handleChangeMonth = (e) => {
    setMonth(e.target.value);
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
      <select
        className={styles.selectBox}
        onChange={handleChange}
        key={year}
        defaultValue={year}
      >
        {options.map((option) => {
          return <option value={option.value}>{option.name}</option>;
        })}
      </select>
      {title === "졸업년도" ? (
        <select
          className={styles.selectBox2}
          onChange={handleChangeMonth}
          key={month}
          defaultValue={month}
        >
          <option value={2} defaultValue={month === 2}>
            2월
          </option>
          <option value={8} defaultValue={month === 8}>
            8월
          </option>
        </select>
      ) : undefined}
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

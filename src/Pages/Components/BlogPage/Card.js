import React, { useState } from "react";
import styles from "./Card.module.css";

const Card = ({
  title,
  date,
  type,
  content,
  setModalOpen
}) => {

  const truncate = (str, n) => {
    return str?.length > n ? str.substr(0, n - 1) + "..." : str;
  };
  
  return (
      <div className={styles.card} onClick={() => setModalOpen(true)}>
        <div className={styles.main}>
            <text className={styles.title}>{title}</text>
            <button className={styles.category_btn}>{type}</button>
        </div>
        <p className={styles.content}>
            {truncate(content, 80)}
        </p>
      </div>
  )
}

export default Card;

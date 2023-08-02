import React, { useState } from "react";
import styles from "./Card.module.css";

const Card = ({
  id,
  title,
  type,
  date,
  content,
  setModalOpen,
  setBlogSelected
}) => {

  const truncate = (str, n) => {
    return str?.length > n ? str.substr(0, n - 1) + "..." : str;
  };

  const handleCardClick = () => {
    setModalOpen(true);
    setBlogSelected({ id, title, type, date, content });
    console.log("this is card : " + title);
  }
  
  return (
      <div className={styles.card} onClick={handleCardClick}>
        <div className={styles.main}>
            <text className={styles.title}>{title}</text>
            <button className={styles.category_btn}>{type}</button>
        </div>
        <p className={styles.content}>
            {truncate(content, 105)}
        </p>
      </div>
  )
}

export default Card;

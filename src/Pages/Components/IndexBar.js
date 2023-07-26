import React from "react";
import styles from "./IndexBar.module.css";
import { Link } from "react-router-dom";

const IndexBar = ({ id }) => {
  return (
    <div className={styles.container}>
      <Link to="/grade" style={{ textDecoration: "none" }}>
        <div className={id === 1 ? styles.selected : styles.index}>성적</div>
      </Link>
      <Link to="/activity" style={{ textDecoration: "none" }}>
        <div className={id === 2 ? styles.selected : styles.index}>활동</div>
      </Link>
      <Link to="/graduation" style={{ textDecoration: "none" }}>
        <div className={id === 3 ? styles.selected : styles.index}>졸업</div>
      </Link>
      <Link to="/blog" style={{ textDecoration: "none" }}>
        <div className={id === 4 ? styles.selected : styles.index}>블로그</div>
      </Link>
    </div>
  );
};

export default IndexBar;

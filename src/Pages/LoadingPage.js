import React from "react";
import styles from "./LoadingPage.module.css";
import Spinner from "../assets/loading.gif";

const LoadingPage = () => {
  return (
    <div className={styles.container}>
      <span className={styles.loadingText}>Loading...</span>
      <img src={Spinner} alt="로딩중" width="5%" />
    </div>
  );
};

export default LoadingPage;

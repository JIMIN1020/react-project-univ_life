import styles from "./MainPage.module.css";

const MainPage = () => {
  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <h1>대학 생활 기록 웹사이트</h1>
      </div>
      <div className={styles.bottom}>
        <div className={styles.menuContainer}>
          <span> </span>
        </div>
        <div className={styles.profile}>
          <span> </span>
        </div>
      </div>
    </div>
  );
};

export default MainPage;

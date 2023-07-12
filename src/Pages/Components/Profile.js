import React from "react";
import styles from "./Profile.module.css";

const Profile = () => {
  return (
    <div className={styles.profile}>
      <div className={styles.userImage}> </div>
      <div className={styles.text1}>
        눈송이
        <br />
        2010.10.10
        <br />
      </div>
      <div className={styles.text2}>
        학교 | 숙명여자대학교 <br />
        학번 | 200000 <br />
        학과 | IT공학과
      </div>
    </div>
  );
};

export default Profile;

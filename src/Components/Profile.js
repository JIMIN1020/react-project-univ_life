import React from "react";
import styles from "./Profile.module.css";
import { FaHouse } from "react-icons/fa6";
import { Link } from "react-router-dom";

const Profile = () => {
  return (
    <div className={styles.profile}>
      <div className={styles.userImage}>
        <img
          src={process.env.PUBLIC_URL + "/Images/noonsong.gif"}
          className={styles.img}
          width="130px"
          alt="img"
        />
      </div>
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

      <Link to="/" style={{ textDecoration: "none" }}>
        <div className={styles.buttonBox}>
          <FaHouse style={{ width: "25px", height: "25px" }} />
          <span>HOME</span>
        </div>
      </Link>
    </div>
  );
};

export default Profile;

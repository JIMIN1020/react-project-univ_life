import React, { useEffect, useState } from "react";
import styles from "./Profile.module.css";
import { FaHouse } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { authService, dbService } from "../fbase";
import { doc, getDoc } from "firebase/firestore";

const Profile = () => {
  const [profile, setProfile] = useState({});

  /* ------------ 유저 정보 가져오기 ------------ */
  const getUserInfo = async () => {
    const docRef = doc(dbService, "users", authService.currentUser.uid);
    const docData = await getDoc(docRef);
    setProfile(docData.data());
  };

  useEffect(() => {
    getUserInfo();
  }, []);

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
      <div className={styles.text1}>{profile.name}</div>
      <div className={styles.text2}>
        학교 | 숙명여자대학교 <br />
        학번 | {profile.studentId} <br />
        학과 | {profile.major}
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

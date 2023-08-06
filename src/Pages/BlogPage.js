import React, { useEffect, useState } from "react";
import styles from "./BlogPage.module.css";
import Profile from "../Components/Profile";
import IndexBar from "../Components/IndexBar";
import Card from "../Components/BlogPage/Card";
import BlogModal from "../Components/BlogPage/BlogModal";
import NewBlogModal from "../Components/BlogPage/NewBlogModal";
import { Link } from "react-router-dom";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { authService, dbService } from "../fbase";

export const BlogPage = () => {
  /*const initialBlogData = localStorage.getItem("blogData")
    ? JSON.parse(localStorage.getItem("blogData"))
    : [];*/

  const options = [
    { value: "daily", name: "일상" },
    { value: "memo", name: "메모" },
    { value: "etc", name: "기타" },
  ];

  const [blogData, setBlogData] = useState([]);
  const [typeData, setTypeData] = useState();
  const [modalOpen, setModalOpen] = useState(false);
  const [newModalOpen, setNewModalOpen] = useState(false);
  const [blogSelected, setBlogSelected] = useState({});
  const [clickedType, setClickedType] = useState("");

  const showModal = (blog) => {
    setModalOpen(true);
    setBlogSelected(blog);
  };

  const showNewModal = () => {
    setNewModalOpen(true);
  };

  // 블로그 업데이트
  useEffect(() => {
    getBlog();
  }, []);

  const getBlog = async () => {
    const q = query(
      collection(dbService, `blogPage/${authService.currentUser.uid}/blogData`),
      orderBy("createdAt", "asc")
    );

    onSnapshot(q, (snapshot) => {
      const blogs = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setBlogData(blogs);
    });
  };

  // 타입별 정렬
  useEffect(() => {
    getTypeData();
  }, []);

  const getTypeData = async () => {
    const q = query(
      collection(dbService, `blogData/${authService.currentUser.uid}/blogData`),
      where("type", "==", clickedType)
    );
    const querySnapshot = await getDocs(q);

    querySnapshot.forEach((doc) => {
      const newTypeData = {
        ...doc.data(),
        docID: doc.id,
      };
      setBlogData((prev) => [...prev, newTypeData]);
    });
  };

  /*const handleRemoveClick = async (docId) => {
    const docRef = doc(
      dbService,
      `blogPage/${authService.currentUser.uid}/blogData`,
      docId
    );
    await deleteDoc(docRef);
    /*const updatedBlogData = blogData.filter((blog) => blog.id !== id);
    setBlogData(updatedBlogData);
    localStorage.setItem("blogData", JSON.stringify(updatedBlogData));
    setModalOpen(false);*/
  //};

  /* 파이어베이스에 새 블로그 추가
  const addNewBlog = async (newBlog) => {
    const docRef = doc(
      collection(
        dbService,
        "blogPage",
        `${authService.currentUser.uid}`,
        "blogData"
      )
    );
    await setDoc(docRef, newBlog);
  };*/

  // 블로그 수정
  /*const handleEditSubmit = async (docId) => {
    const docRef = doc(
      dbService,
      `blogPage/${authService.currentUser.uid}/blogData`,
      docId
    );
    await updateDoc(docRef, {
      title: editedTitle,
      type: editedType,
      content: editedContent,
    });
    /*const editedBlogData = blogData.map((blog) => {
      if (blog.id === id) {
        return {
          ...blog,
          title: editedTitle,
          type: editedType,
          content: editedContent,
        };
      }
      return blog;
    });
    setBlogData(editedBlogData);
    localStorage.setItem("blogData", JSON.stringify(editedBlogData));
    setModalOpen(false);
  };*/

  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <Link to="/" style={{ textDecoration: "none" }}>
          <h1>대학 생활 기록 웹사이트</h1>
        </Link>
      </div>
      <div className={styles.bottom}>
        <IndexBar id={4} />
        <div className={styles.contents}>
          <Profile />
          <div className={styles.contentBox}>
            <div className={styles.category_bar}>
              <text className={styles.text}>category</text>
              <button className={styles.category_btn}>All</button>
              <button className={styles.category_btn}>일상</button>
              <button className={styles.category_btn}>메모</button>
              <button className={styles.category_btn}>기타</button>
              <button className={styles.category_add}>+add</button>
            </div>
            <div>
              <section className={styles.cardsList}>
                {blogData.map((blog) => (
                  <Card
                    id={blog.id}
                    title={blog.title}
                    type={blog.type}
                    date={blog.date}
                    content={blog.content}
                    setModalOpen={showModal}
                    setBlogSelected={setBlogSelected}
                  />
                ))}
                <section className="addcard" onClick={() => showNewModal()}>
                  <div className={styles.card_add}>+</div>
                </section>
              </section>
            </div>
            {modalOpen && (
              <BlogModal
                blog={blogSelected}
                id={blogSelected.id}
                title={blogSelected.title}
                date={blogSelected.date}
                type={blogSelected.type}
                content={blogSelected.content}
                //handleEditSubmit={handleEditSubmit}
                setBlogSelected={setBlogSelected}
                setBlogData={setBlogData}
                setModalOpen={setModalOpen}
                blogData={blogData}
                options={options}
                //handleRemoveClick={handleRemoveClick}
              />
            )}
            {newModalOpen && (
              <NewBlogModal
                setNewModalOpen={setNewModalOpen}
                options={options}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogPage;

import React, { useState } from "react";
import styles from "./BlogPage.module.css";
import Profile from "./Components/Profile";
import IndexBar from "./Components/IndexBar";
import Card from "./Components/BlogPage/Card";
import BlogModal from "./Components/BlogPage/BlogModal";
import NewBlogModal from "./Components/BlogPage/NewBlogModal";
import { Link } from "react-router-dom";

export const BlogPage = () => {

  const initialBlogData = localStorage.getItem("blogData")
  ? JSON.parse(localStorage.getItem("blogData")) : [];

  const [blogData, setBlogData] = useState(initialBlogData);
  const [modalOpen, setModalOpen] = useState(false);
  const [newModalOpen, setNewModalOpen] = useState(false);
  const [blogSelected, setBlogSelected] = useState({});

  const showModal = (blog) => {
    setModalOpen(true);
    setBlogSelected(blog);
  }

  const showNewModal = () => {
    setNewModalOpen(true);
  }

  const addNewBlog = (newBlog) => {
    setBlogData((prev) => [...prev, newBlog]);
    localStorage.setItem("blogData", JSON.stringify([...blogData, newBlog]));
  }
  
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
                        key={blog.id}
                        title={blog.title}
                        type={blog.type}
                        content={blog.content}
                        setModalOpen={showModal}
                      />
                  ))}
                  <section className="addcard" onClick={() => showNewModal()}>
                    <div className={styles.card_add}>+</div>
                  </section>
                </section>
            </div>
            {modalOpen && <BlogModal blog={blogSelected} setModalOpen={setModalOpen} />}
            {newModalOpen && <NewBlogModal setNewModalOpen={setNewModalOpen} addNewBlog={addNewBlog} />}
          </div> 
        </div>
      </div>
    </div>
  );
};

export default BlogPage;

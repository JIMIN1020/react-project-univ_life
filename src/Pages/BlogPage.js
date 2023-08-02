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
    ? JSON.parse(localStorage.getItem("blogData"))
    : [];

  const options = [
    { value: "daily", name: "일상" },
    { value: "memo", name: "메모" },
    { value: "etc", name: "기타" },
  ];

  const [blogData, setBlogData] = useState(initialBlogData);
  const [modalOpen, setModalOpen] = useState(false);
  const [newModalOpen, setNewModalOpen] = useState(false);
  const [blogSelected, setBlogSelected] = useState({});


  const blogClicked = (blog) => {
    console.log("this is blogpage hey: " + blogSelected.title + blogData);
  }

  const showModal = (blog) => {
    setModalOpen(true);
    setBlogSelected(blog);
    console.log("this is blogpage : " + blogSelected.title + blogData);
  };

  const showNewModal = () => {
    setNewModalOpen(true);
  };

  const addNewBlog = (newBlog) => {
    setBlogData((prev) => [...prev, newBlog]);
    localStorage.setItem("blogData", JSON.stringify([...blogData, newBlog]));
  };

  // 블로그 수정
  const handleEditSubmit = (id, editedTitle, editedType, editedContent) => {
    const editedBlogData = blogData.map((blog) => {
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
  };

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
                    onClick={() => blogClicked()}
                  />
                ))}
                <section className="addcard" onClick={() => showNewModal()}>
                  <div className={styles.card_add}>+</div>
                </section>
              </section>
            </div>
            {modalOpen && (
              <BlogModal
                id={blogSelected.id}
                title={blogSelected.title}
                date={blogSelected.date}
                type={blogSelected.type}
                content={blogSelected.content}
                handleEditSubmit={handleEditSubmit}
                setBlogSelected={setBlogSelected}
                setBlogData={setBlogData}
                setModalOpen={setModalOpen}
                blogData={blogData}
                options={options}
              />
            )}
            {newModalOpen && (
              <NewBlogModal
                setNewModalOpen={setNewModalOpen}
                addNewBlog={addNewBlog}
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

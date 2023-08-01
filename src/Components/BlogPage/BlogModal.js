import React, { useRef, useState, useEffect } from "react";
import styles from "./BlogModal.module.css";
import useOnClickOutside from "./useOnClickOutside";
import { BsPencilSquare, BsFillTrashFill } from "react-icons/bs";
import { TextareaAutosize } from "@mui/base";
import moment from "moment";

function BlogModal({
  id,
  title,
  date,
  type,
  content,
  setBlogData,
  setModalOpen,
  blogData,
  options,
}) {
  const ref = useRef();
  useOnClickOutside(ref, () => {
    setModalOpen(false);
  });

  const refEdit = useRef();
  useOnClickOutside(refEdit, () => {
    if (isEditing) {
      setModalBlogData({
        id,
        title,
        date,
        type,
        content,
      });
      setIsEditing(false);
    } else {
      setModalOpen(false);
    }
  });

  console.log("this is blogmodal : " + title);

  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(title);
  const [editedType, setEditedType] = useState(type);
  const [editedContent, setEditedContent] = useState(content);
  const [modalBlogData, setModalBlogData] = useState({});
  const nowTime = moment().format("YYYY.MM.DD HH:mm:ss");
  const initialModalBlogData = {
    id,
    title,
    date,
    type,
    content,
  };

  // 블로그 모달이 열릴 때, 선택한 블로그의 내용을 modalBlogData에 저장
  useEffect(() => {
    setModalBlogData(initialModalBlogData);
  }, [id, title, date, type, content]);

  // isEditing이 false로 변경될 때 모달 초기값을 수정된 블로그 정보로 업데이트
  useEffect(() => {
    if (!isEditing) {
      setModalBlogData({
        id,
        title: editedTitle,
        date: nowTime,
        type: editedType,
        content: editedContent,
      });
    }
  }, [isEditing, id, editedTitle, nowTime, editedType, editedContent]);

  // 수정 취소
  const handelCancel = () => {
    setEditedTitle(title);
    setEditedType(type);
    setEditedContent(content);
    setIsEditing(false);
  }

  // 블로그 삭제하기
  const handleRemoveClick = (id) => {
    const updatedBlogData = blogData.filter((blog) => blog.id !== id);
    setBlogData(updatedBlogData);
    localStorage.setItem("blogData", JSON.stringify(updatedBlogData));
    setModalOpen(false);
  };

  // 블로그 수정하기
  const handleEditSubmit = (e) => {
    e.preventDefault();

    let editedBlogData = blogData.map((blog) => {
      
      if (blog.id === id) {
        console.log("이프문 들어옴!!");
        console.log("this is editedblogdata : " + blog.title);
          blog.title = editedTitle;
          blog.type = editedType;
          blog.content = editedContent;
          blog.date = nowTime;
      }
      return blog;
    });
    setBlogData(editedBlogData);
    localStorage.setItem("blogData", JSON.stringify(editedBlogData));
    setIsEditing(false);
  };

  const handleTitleEdit = (e) => {
    setEditedTitle(e.target.value);
    setModalBlogData((prev) => ({
      ...prev,
      title: e.target.value,
    }))
  };

  const handleTypeEdit = (e) => {
    setEditedType(e.target.value);
    setModalBlogData((prev) => ({
      ...prev,
      type: e.target.value,
    }))
  };

  const handleContentEdit = (e) => {
    setEditedContent(e.target.value);
    setModalBlogData((prev) => ({
      ...prev,
      content: e.target.value,
    }))
  };

  const SelectType = (props) => {
    return (
      <select
        className={styles.modal__type}
        value={editedType}
        onChange={handleTypeEdit}
      >
        {props.options.map((option) => (
          <option key={option.value} value={option.name}>
            {option.name}
          </option>
        ))}
      </select>
    );
  };

  /*
  const NewSelectType = (props) => {
    return (
        <select className={styles.modal__type} value={type} onChange={typeChange}>
            {props.options.map((option) => (
                <option
                  key={option.value}
                  value={option.value}
                >
                    {option.name}
                </option>
            ))}
        </select>
    )
  }*/

  if (isEditing) {
    return (
      <div className={styles.presentation}>
        <div className={styles.wrapper_modal}>
          <div className={styles.modal_edit} ref={refEdit}>
            <form onSubmit={handleEditSubmit} className={styles.modal__content}>
              <div className={styles.modal__top}>
                <span onClick={handelCancel} className={styles.modal_close}>
                  X
                </span>
                <SelectType
                  options={options}
                  defaultValue={editedType}
                  onChange={handleTypeEdit}
                />
                <br></br>
                <input
                  className={styles.modal__title}
                  type="text"
                  name="title"
                  value={editedTitle}
                  onChange={handleTitleEdit}
                />
              </div>
              <TextareaAutosize
                className={styles.modal__text}
                name="content"
                minRows={23}
                cols={70}
                value={editedContent}
                onChange={handleContentEdit}
              />
              <br></br>
              <div className={styles.footer}>
                <input
                  className={styles.cancel}
                  type="button"
                  value="취소하기"
                  onClick={handelCancel}
                />
                <input className={styles.save} type="submit" value="저장하기" />
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className={styles.presentation}>
        <div className={styles.wrapper_modal}>
          <div className={true ? styles.modal_initial : styles.modal} ref={ref}>
            <div className={styles.modal__content}>
              <div className={styles.modal__top}>
                <div className={styles.modal__top1}>
                  <span className={styles.modal__type}>{modalBlogData.type}</span>
                  <div className={styles.icons}>
                    <BsPencilSquare
                      className={styles.edit}
                      onClick={() => {
                        setIsEditing(true);
                        setEditedTitle(initialModalBlogData.title);
                        setEditedType(initialModalBlogData.type);
                        setEditedContent(initialModalBlogData.content);
                      }}
                    />
                    <BsFillTrashFill
                      className={styles.trash}
                      onClick={() => handleRemoveClick(id)}
                    />
                  </div>
                  <span
                    onClick={() => setModalOpen(false)}
                    className={styles.modal_close}
                  >
                    X
                  </span>
                </div>
                <br></br>
                <div className={styles.modal__top2}>
                  <span className={styles.modal__title}>{modalBlogData.title}</span>
                  <span className={styles.modal__date}>{modalBlogData.date}</span>
                </div>
              </div>
              <div className={styles.modal__text}>{modalBlogData.content}</div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default BlogModal;

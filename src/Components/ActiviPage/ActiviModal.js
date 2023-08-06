import React, { useEffect, useState } from "react";
import styles from "./ActiviModal.module.css";

function ActiviModal({ setModalOpen, onSave, savedActiviContent }) {
  const [edit, setEdit] = useState(false);
  const [date, setDate] = useState(savedActiviContent?.date || "");
  const [title, setTitle] = useState(savedActiviContent?.title || "");
  const [detail, setDetail] = useState(savedActiviContent?.detail || "");

  useEffect(() => {
    if (savedActiviContent) {
      setDate(savedActiviContent.date || "");
      setTitle(savedActiviContent.title || "");
      setDetail(savedActiviContent.detail || "");
    }
  }, [savedActiviContent]);

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const handleEdit = () => {
    setEdit(true);
  };

  const handleSave = async(date, title, detail) => {
    const savedContent = {date, title, detail};
    onSave(savedContent);
    setModalOpen(false);
  };

  return (
    <div className={styles.modal}>
      <form onSubmit={handleSubmit}>
        <span className={styles.Btn} onClick={() => setModalOpen(false)}>
          x
        </span>

        <div className={styles.modal__content}>
          {edit ? (
            <input
              className={styles.modal__date}
              value={date}
              placeholder="2000학년도 0학기"
              onChange={(e) => setDate(e.target.value)}
            />
          ) : (
            <span className={styles.modal__date}>{date ? date : "학기"}</span>
          )}

          {edit ? (
            <input
              className={styles.modal__title}
              style={{ width: "420px", height: "30px" }}
              value={title}
              placeholder="제목"
              onChange={(e) => setTitle(e.target.value)}
            />
          ) : (
            <h6 className={styles.modal__title}>{title ? title : "제목"}</h6>
          )}

          {edit ? (
            <textarea
              className={styles.modal__details}
              style={{ width: "420px", height: "400px" }}
              value={detail}
              placeholder="활동 내용을 입력하세요"
              onChange={(e) => setDetail(e.target.value)}
            ></textarea>
          ) : (
            <p className={styles.modal__details}>{detail ? detail : "활동"}</p>
          )}
        </div>

        {edit ? (
          <>
            <button type="submit" className={styles.Btnok} onClick={()=>handleSave(date, title, detail)}>
              저장
            </button>
          </>
        ) : (
          <button className={styles.Btnok} onClick={handleEdit}>
            편집
          </button>
        )}
      </form>
    </div>
  );
}

export default ActiviModal;

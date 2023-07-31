import React, { useEffect, useState } from "react";
import styles from "./ActiviModal.module.css";

function ActiviModal({ setModalOpen, onSave, savedActiviContent }) {
  const [edit, setEdit] = useState(false);
  const [date, setDate] = useState(savedActiviContent?.date || "학기");
  const [title, setTitle] = useState(savedActiviContent?.title || "제목");
  const [detail, setDetail] = useState(savedActiviContent?.content || "");

  // Set the initial values based on the savedActiviContent prop
  useEffect(() => {
    if (savedActiviContent) {
      setDate(savedActiviContent.date || "학기");
      setTitle(savedActiviContent.title || "제목");
      setDetail(savedActiviContent.content || "");
    }
  }, [savedActiviContent]);

  const handleSubmit = (e) => {
    e.preventDefault();

    let newActivi = {
      id: Date.now(),
      date: date,
      title: title,
      detail: detail,
    };

    onSave(newActivi);
    setModalOpen(false);
  };

  const handleEdit = () => {
    setEdit(true);
  };

  const handleSave = (date, title, content) => {
    const savedContent = { date, title, content };
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
              onChange={(e) => setDate(e.target.value)}
            />
          ) : (
            <span className={styles.modal__date}>{date}</span>
          )}

          {edit ? (
            <input
              className={styles.modal__title}
              style={{ width: "420px", height: "30px" }}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          ) : (
            <h6 className={styles.modal__title}>{title}</h6>
          )}

          {edit ? (
            <textarea
              className={`${styles.modal__details} ${!detail && styles.hidden}`} /* detail이 비어있을 때 숨기기 */
              style={{ width: "420px", height: "400px" }}
              value={detail}
              onChange={(e) => setDetail(e.target.value)}
            ></textarea>
          ) : (
            <p className={styles.modal__details}>{detail ? detail : "활동 내용이 비어있습니다."}</p>
          )}
        </div>

        {edit ? (
          <>
            <button className={styles.Btnok} onClick={()=>handleSave(date, title, detail)}>
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

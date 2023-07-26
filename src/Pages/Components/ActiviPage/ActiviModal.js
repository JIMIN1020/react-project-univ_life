import React, { useRef, useEffect, useState } from "react";
import styles from "./ActiviModal.module.css";
import useOnClickOutside from "./hooks/useOnClickOutside.js";

function ActiviModal({ setModalOpen, onSave, savedActiviContent, setSavedActiviContent }) {
  const [edit, setEdit] = useState(false);
  const [date, setDate] = useState(savedActiviContent?.date || "학기")
  const [title, setTitle] = useState(savedActiviContent?.title || "제목");
  const [content, setContent] = useState("활동 내용을 작성하세요");

  const ref = useRef();

  const handleEdit = () => {
    setEdit(true);
  };

  const handleSave = () => {
    const savedContent = { date, title, content };
    onSave(savedContent); // onSave 콜백 함수를 호출하여 내용 전달
    setModalOpen(false); // 모달을 닫도록 추가
  };

  useEffect(() => {
    if (savedActiviContent) {
      setDate(savedActiviContent.date || "학기");
      setTitle(savedActiviContent.title || "제목");
      setContent(savedActiviContent.content || "활동 내용을 작성하세요");
    }
  }, [savedActiviContent]);

  /*useOnClickOutside(ref, () => {
      setModalOpen(false);
  });*/

  return (
    <div className={styles.modal}>
      <span className={styles.Btn} ref={ref} onClick={() => setModalOpen(false)}>
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
            className={styles.modal__details}
            style={{ width: "420px", height: "400px" }}
            value={content}
            onChange={(e) => setContent(e.target.value)}
          ></textarea>
        ) : (
          <p className={styles.modal__details}>{content}</p>
        )}
      </div>

      {edit ? (
        <>
          <button className={styles.BtnSave} onClick={handleSave}>
            저장
          </button>
          <button className={styles.Btnok} onClick={() => setEdit(false)}>
            취소
          </button>
        </>
      ) : (
        <button className={styles.Btnok} onClick={handleEdit}>
          편집
        </button>
      )}
    </div>
  );
}

export default ActiviModal;

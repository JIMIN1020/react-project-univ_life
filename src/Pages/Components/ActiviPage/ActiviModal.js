import React, { useRef, useCallback, useState } from "react";
import styles from "./ActiviModal.module.css";
import useOnClickOutside from "./hooks/useOnClickOutside.js";

function ActiviModal({ setModalOpen, onSave }) {
  const [edit, setEdit] = useState(false);
  const [date, setDate] = useState("학기")
  const [title, setTitle] = useState("제목");
  const [content, setContent] = useState("활동 내용을 작성하세요");

  const ref = useRef();

  const handleEdit = () => {
    setEdit(true);
  };

  const handleSave = () => {
    setEdit(false);
    // 저장 로직을 추가하고 싶다면 여기에 구현하세요
    const savedContent = { date, title, content };
    onSave(savedContent); // onSave 콜백 함수를 호출하여 내용 전달
  };

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
            style={{ width: "200px", height: "30px" }}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        ) : (
          <h6 className={styles.modal__title}>{title}</h6>
        )}

        {edit ? (
          <textarea
            className={styles.modal__details}
            style={{ width: "300px", height: "200px" }}
            value={content}
            onChange={(e) => setContent(e.target.value)}
          ></textarea>
        ) : (
          <p className={styles.modal__details}>{content}</p>
        )}
      </div>

      {edit ? (
        <button className={styles.Btnok} onClick={handleSave}>
          저장
        </button>
      ) : (
        <button className={styles.Btnok} onClick={handleEdit}>
          편집
        </button>
      )}
    </div>
  );
}

export default ActiviModal;

import React, { useRef, useState } from "react";
import styles from "./BlogModal.module.css";
import useOnClickOutside from "./useOnClickOutside";

function BlogModal({ blog, setModalOpen }) {
  const { title, date, type, content } = blog;

  const ref = useRef();
  useOnClickOutside(ref, () => {
    setModalOpen(false);
  });

  return (
    <div className={styles.presentation}>
      <div className={styles.wrapper_modal}>
        <div className={styles.modal} ref={ref}>
          <span
            onClick={() => setModalOpen(false)}
            className={styles.modal_close}
          >
            X
          </span>

          <div className={styles.modal__content}>
            <div className={styles.modal__top}>
              <span className={styles.modal__type}>{type}</span>
              <span className={styles.modal__title}>{title}</span>
              <span className={styles.modal__date}>{date}</span>
            </div>
            <div className={styles.modal__text}>{content}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BlogModal;

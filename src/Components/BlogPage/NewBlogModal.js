import React, { useRef, useState } from 'react';
import useOnClickOutside from "./useOnClickOutside";
import styles from "./NewBlogModal.module.css";

function NewBlogModal({
  setNewModalOpen,
  addNewBlog
}) {

  const ref = useRef();
  useOnClickOutside(ref, () => {setNewModalOpen(false)})

  const [title, setTitle] = useState("");
  const [type, setType] = useState("");
  const [content, setContent] = useState("");
  const options = [
    {value: "daily", name: "일상"},
    {value: "memo", name: "메모"},
    {value: "etc", name: "기타"},
  ]

  const handleSubmit = (e) => {
    e.preventDefault();

    let newBlog = {
        id: Date.now(),
        title: title,
        type: type,
        content: content,
    };

    const selectedOption = options.find((option) => option.value === type);
    if (selectedOption) {
      newBlog.type = selectedOption.name;
    }

    addNewBlog(newBlog);

    setTitle("");
    setType("daily");
    setContent("");

    setNewModalOpen(false);
  }

  const SelectType = (props) => {
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
  }

  const titleChange = (e) => {
    setTitle(e.target.value)
  }

  const typeChange = (e) => {
    setType(e.target.value)
  }

  const contentChange = (e) => {
    setContent(e.target.value)
  }

  return (
    <div className={styles.presentation}>
      <div className={styles.wrapper_modal}>
        <div className={styles.modal} ref={ref}>
          <form onSubmit={handleSubmit} className={styles.modal__content}>
            <div className={styles.modal__top}>
              <span onClick={() => setNewModalOpen(false)} className={styles.modal_close}>
                X
              </span>
              <SelectType
                options={options}
                defaultValue="type"
                onChange={typeChange}
              />
              <br></br>
              <input 
                className={styles.modal__title} 
                type='text'
                name="title"
                placeholder="제목을 입력하세요"
                value={title}
                onChange={titleChange}
              />
            </div>
            <textarea
                className={styles.modal__text}
                name='content'
                rows={30}
                cols={70}
                placeholder='내용을 입력하세요'
                value={content}
                onChange={contentChange}
            /><br></br>
            <div className={styles.footer}>
              <input className={styles.cancel} type='button' value="취소하기" onClick={() => setNewModalOpen(false)}/>
              <input className={styles.save} type='submit' value="저장하기" />
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default NewBlogModal

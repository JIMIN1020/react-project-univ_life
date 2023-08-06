import React, { useRef, useState } from 'react';
import useOnClickOutside from "./useOnClickOutside";
import styles from "./NewBlogModal.module.css";
import { TextareaAutosize } from '@mui/base';
import moment from 'moment/moment';
import { collection, doc, setDoc } from 'firebase/firestore';
import { authService, dbService } from '../../fbase';

function NewBlogModal({
  setNewModalOpen,
  options
}) {

  const ref = useRef();
  useOnClickOutside(ref, () => {setNewModalOpen(false)})

  const [title, setTitle] = useState("");
  const [type, setType] = useState("");
  const [content, setContent] = useState("");

  const nowTime = moment().format("YYYY.MM.DD HH:mm:ss");

  // 블로그 글 작성
  const handleSubmit = (e) => {
    e.preventDefault();

    let newBlog = {
        createdAt: Date.now(),
        title: title,
        type: type,
        date: nowTime,
        content: content,
    };

    const selectedOption = options.find((option) => option.value === type);
    if (selectedOption) {
      newBlog.type = selectedOption.name;
    } else {
      newBlog.type = options[0].name;
    }

    addNewBlog(newBlog);

    setTitle("");
    setType("daily");
    setContent("");

    setNewModalOpen(false);
  }

  // 파이어베이스에 새 블로그 추가
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
  };

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
  }

  const titleChange = (e) => {
    setTitle(e.target.value);
  }

  const typeChange = (e) => {
    setType(e.target.value);
  }

  const contentChange = (e) => {
    setContent(e.target.value);
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
              <NewSelectType
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
            <TextareaAutosize
                className={styles.modal__text}
                name='content'
                minRows={23}
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

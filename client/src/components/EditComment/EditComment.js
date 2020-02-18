import React, { useState } from "react";
import cls from "./EditComment.module.css";

export default function EditComment(props) {
  const [comment, setComment] = useState(props.comment);
  function updateData(e) {
    const newData = { ...comment };
    newData.text = e.target.value;
    setComment(newData);
  }
  function clickHandler() {
    props.updateComment(comment);
    props.cancel(false);
  }
  return (
    <form className={cls.EditComment} onSubmit={e => e.preventDefault()}>
      <textarea
        className={cls.Comment_text}
        name="text"
        id="text"
        value={comment.text}
        onChange={updateData}
      ></textarea>
      <div className={cls.ButtonWrapper}>
        <button className={cls.Button_save} onClick={clickHandler}>
          <i className="fas fa-check"></i>
        </button>
        <button
          className={cls.Button_cancel}
          onClick={() => props.cancel(false)}
        >
          <i className="fas fa-times"></i>
        </button>
      </div>
    </form>
  );
}

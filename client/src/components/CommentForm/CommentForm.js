import React, { useState, useEffect } from "react";
import cls from "./CommentForm.module.css";

export default function CommentForm(props) {
  const userState = {
    user: { value: props.author, touched: false },
    text: { value: "", touched: false },
    canSubmit: false
  };

  const [data, setData] = useState(userState);

  useEffect(() => {
    setData(userState);
  }, [props.author]);

  function updateData(e) {
    const newData = { ...data };
    newData[e.target.name] = {
      value: e.target.value,
      touched: true
    };
    newData.canSubmit = !!newData.user.value && !!newData.text.value;
    setData(newData);
  }

  function sendData(data) {
    props.formHandler({
      user: data.user.value,
      text: data.text.value,
      parentId: props.id
    });
    setData(userState);
    props.showForm && props.showForm(false);
  }
  return (
    <form className={cls.Form} onSubmit={e => e.preventDefault()}>
      <input
        className={cls.name}
        type="text"
        placeholder="Your name"
        id="user"
        name="user"
        value={data.user.value}
        onChange={updateData}
      />
      <textarea
        className={cls.text}
        id="text"
        name="text"
        placeholder="Type something..."
        value={data.text.value}
        onChange={updateData}
      ></textarea>
      <button
        className={cls.Comment_Button}
        disabled={!data.canSubmit}
        onClick={() => sendData(data)}
      >
        Comment
      </button>
    </form>
  );
}

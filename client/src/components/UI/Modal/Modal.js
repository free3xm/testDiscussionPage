import React from "react";
import cls from "./Modal.module.css";

export default function Modal(props) {
  return (
    <div className={cls.Modal}>
      <p className={cls.Modal_text}>{props.text}</p>
    </div>
  );
}

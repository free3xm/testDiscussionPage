import React from "react";
import cls from "./Loader.module.css";

export default function Loader(props) {
  return (
    <div className={cls.Loader_wrapper}>
      <div className={cls.Loader}>
        <div className={cls.Loader_items}>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
    </div>
  );
}

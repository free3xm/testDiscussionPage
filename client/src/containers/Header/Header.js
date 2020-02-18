import React from "react";
import cls from "./Header.module.css";
import { connect } from "react-redux";

function Header(props) {
  return (
    <header className={cls.Header}>
      <img className={cls.logo} src="./awesome.svg" alt="awesome logo" />
      <p className={cls.comments}>Comments: {props.comments.length}</p>
    </header>
  );
}
function mapStateToProps(state) {
  return {
    comments: state.comments
  };
}
export default connect(mapStateToProps)(Header);

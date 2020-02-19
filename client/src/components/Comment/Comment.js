import React, { useState } from "react";
import cls from "./Comment.module.css";
import CommentForm from "../CommentForm/CommentForm";
import EditComment from "../EditComment/EditComment";

export default function Comment(props) {
  const [show, setShow] = useState(false);
  const [edit, setEdit] = useState(false);

  const replyTo = props.replyTo ? (
    <p className={cls.replyTo}>reply to: {props.replyTo}</p>
  ) : null;

  const form = show ? (
    <CommentForm
      id={props.comment._id}
      formHandler={props.formHandler}
      showForm={setShow}
      author={props.author}
    />
  ) : null;

  const updatedAt = props.comment.updateAt ? (
    <p>
      this comment was edited at&nbsp;
      {new Date(props.comment.updateAt).toLocaleString()}
    </p>
  ) : null;

  const replies = props.replies ? (
    <div className={cls.replies}>{props.replies}</div>
  ) : null;

  const button = props.replies ? (
    <button className={cls.ReplyButton} onClick={() => setShow(!show)}>
      <i className="fas fa-reply"></i>
    </button>
  ) : null;

  const editShow = edit ? (
    <EditComment
      comment={props.comment}
      updateComment={props.updateComment}
      cancel={setEdit}
    />
  ) : (
    <p className={cls.Comment_body}>{props.comment.text}</p>
  );
  console.log(process.env);

  return (
    <div className={cls.Comment}>
      <div className={cls.Comment_header}>
        <div className={cls.UserInfo}>
          <p className={cls.User}>{props.comment.user}</p>
          {replyTo}
        </div>
        {updatedAt}
        <div className={cls.CommentInfoWrapepr}>
          <div className={cls.ButtonsWrapper}>
            <button
              className={cls.CommentButton}
              onClick={() =>
                props.updateComment(
                  {
                    _id: props.comment._id,
                    state: props.comment.state + 1
                  },
                  "/state"
                )
              }
            >
              <i className="fas fa-thumbs-up"></i>
            </button>
            <p className={cls.CommentState}>{props.comment.state}</p>
            <button
              className={cls.CommentButton}
              onClick={() =>
                props.updateComment(
                  {
                    _id: props.comment._id,
                    state: props.comment.state - 1
                  },
                  "/state"
                )
              }
            >
              <i className="fas fa-thumbs-down"></i>
            </button>
            <button
              className={cls.CommentButton}
              onClick={() => setEdit(!edit)}
            >
              <i className="fas fa-pencil-alt"></i>
            </button>
            <button
              className={cls.CommentButton}
              onClick={() => props.deleteHandler(props.comment._id)}
            >
              <i className="fas fa-trash-alt"></i>
            </button>
          </div>
          <time>{new Date(props.comment.created).toLocaleString()}</time>
        </div>
      </div>
      {editShow}
      {button}
      {form}
      {replies}
    </div>
  );
}

import React, { useEffect } from "react";
import cls from "./Discussion.module.css";
import CommentForm from "../../components/CommentForm/CommentForm";
import { connect } from "react-redux";
import createComment from "../../store/actions/createComment";
import loadComments from "../../store/actions/loadComments";
import Comment from "../../components/Comment/Comment";
import deleteComment from "../../store/actions/deleteComment";
import { updateComment } from "../../store/actions/updateComment";
import Modal from "../../components/UI/Modal/Modal";
import Loader from "../../components/UI/Loader/Loader";
import clearErr from "../../store/actions/clearErr";

function Discussion(props) {
  useEffect(() => {
    props.loadComments();
  }, []);

  function renderComment(comment, replies, replyTo) {
    return (
      <Comment
        key={comment._id}
        comment={comment}
        formHandler={props.createComment}
        replies={replies}
        replyTo={replyTo}
        deleteHandler={props.deleteComment}
        updateComment={props.updateComment}
        author={props.author}
      />
    );
  }
  const content = props.loading ? (
    <Loader />
  ) : (
    props.comments.map(comment => {
      if (comment.replies) return null;
      const replies = props.comments.map(filterComment =>
        filterComment.replies === comment._id
          ? renderComment(filterComment, null, comment.user)
          : null
      );
      return renderComment(comment, replies);
    })
  );
  const err = props.err ? <Modal text={props.err} /> : null;
  const timer = setTimeout(() => {
    props.clearErr();
    clearTimeout(timer);
  }, 3000);

  return (
    <main className={cls.Discussion}>
      {err}
      <div className={cls.CommentsWrapper}>
        {content}
        <CommentForm formHandler={props.createComment} author={props.author} />
      </div>
    </main>
  );
}

function mapStateToProps(state) {
  return {
    comments: state.comments,
    loading: state.loading,
    author: state.author,
    err: state.err
  };
}

function mapDispatchToProps(dispatch) {
  return {
    createComment: data => dispatch(createComment(data)),
    loadComments: () => dispatch(loadComments()),
    deleteComment: id => dispatch(deleteComment(id)),
    updateComment: data => dispatch(updateComment(data)),
    clearErr: () => dispatch(clearErr())
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Discussion);

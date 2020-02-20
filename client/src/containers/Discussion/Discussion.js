import React, { useEffect } from "react";
import { connect } from "react-redux";
import cls from "./Discussion.module.css";
import CommentForm from "../../components/CommentForm/CommentForm";
import createComment from "../../store/actions/createComment";
import loadComments from "../../store/actions/loadComments";
import Comment from "../../components/Comment/Comment";
import deleteComment from "../../store/actions/deleteComment";
import { updateComment } from "../../store/actions/updateComment";
import Modal from "../../components/UI/Modal/Modal";
import Loader from "../../components/UI/Loader/Loader";
import clearErr from "../../store/actions/clearErr";

function createComments(list, Component, props) {
  const map = {};
  const roots = [];
  const components = list.map(e => (
    <Component comment={{ ...e }} key={e._id} replies={[]} {...props} />
  ));

  components.forEach((e, i) => {
    map[e.props.comment._id] = i;
  });

  components.forEach(e => {
    if (e.props.comment.reply) {
      e.props.comment.replyTo =
        components[map[e.props.comment.reply]].props.comment.user;
      components[map[e.props.comment.reply]].props.replies.push(e);
    } else roots.push(e);
  });
  return roots;
}

function Discussion(props) {
  useEffect(() => {
    props.loadComments();
  }, []);

  const content = props.loading ? (
    <Loader />
  ) : (
    createComments(props.comments, Comment, {
      formHandler: props.createComment,
      deleteHandler: props.deleteComment,
      updateComment: props.updateComment,
      author: props.author
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
    updateComment: (data, state) => dispatch(updateComment(data, state)),
    clearErr: () => dispatch(clearErr())
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Discussion);

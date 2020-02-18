import { CREATE_COMMENT_SUCCESS } from "./ActionTypes";
import { errorLoadComments } from "./loadComments";

export default function createComment(body) {
  return async dispatch => {
    try {
      const res = await fetch(process.env.REACT_APP_API_URL + "/api/comments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(body)
      });
      const data = await res.json();
      if(!res.ok) throw new Error(data.message)
      dispatch(createCommentSuccess(data, body.user));
    } catch (err) {
      dispatch(errorLoadComments(err.message));
    }
  };
}

function createCommentSuccess(data, author) {
  return {
    type: CREATE_COMMENT_SUCCESS,
    data,
    author
  };
}


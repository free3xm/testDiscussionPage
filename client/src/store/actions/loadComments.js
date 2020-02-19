import {
  LOAD_COMMENTS_START,
  LOAD_COMMENTS_SUCCESS,
  LOAD_COMMENTS_ERROR
} from "./ActionTypes";

export default function loadComments() {
  return async dispatch => {
    try {
      dispatch(startLoadComments());
      const res = await fetch(process.env.REACT_APP_API_URL + "/api/comments");
      const data = await res.json();
      if (!res.ok) throw new Error(data.message);
      dispatch(successLoadComents(data));
    } catch (err) {
      dispatch(errorLoadComments(err.message));
    }
  };
}

function startLoadComments() {
  return {
    type: LOAD_COMMENTS_START
  };
}
export function successLoadComents(data) {
  return {
    type: LOAD_COMMENTS_SUCCESS,
    data
  };
}
export function errorLoadComments(message = "Something went wrong...") {
  return {
    type: LOAD_COMMENTS_ERROR,
    message
  };
}

import { successLoadComents, errorLoadComments } from "./loadComments";

export function updateComment(body, state) {
  return async dispatch => {
    try {
      const url = `${process.env.REACT_APP_API_URL}/api/comments${
        state ? "/state" : ""
      }`;
      const res = await fetch(url, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(body)
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message);
      dispatch(successLoadComents(data));
    } catch (err) {
      dispatch(errorLoadComments(err.message));
    }
  };
}

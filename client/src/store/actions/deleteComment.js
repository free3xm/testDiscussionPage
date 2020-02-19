import { successLoadComents, errorLoadComments } from "./loadComments";
import config from "../../config";

export default function deleteComment(id) {
  return async dispatch => {
    try {
      const res = await fetch(config.url + "/api/comments", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ id })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message);
      dispatch(successLoadComents(data));
    } catch (err) {
      dispatch(errorLoadComments(err.message));
    }
  };
}

import {
  LOAD_COMMENTS_START,
  LOAD_COMMENTS_SUCCESS,
  CREATE_COMMENT_SUCCESS,
  LOAD_COMMENTS_ERROR,
  CLEAR_ERROR
} from "../actions/ActionTypes";

const initialState = {
  comments: [],
  loading: true,
  author: "",
  err: null
};

export default function rootReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_COMMENTS_START: {
      return {
        ...state,
        loading: true
      };
    }
    case LOAD_COMMENTS_SUCCESS:
      return {
        ...state,
        loading: false,
        comments: action.data
      };
    case CREATE_COMMENT_SUCCESS:
      return {
        ...state,
        comments: action.data,
        author: action.author
      };
    case LOAD_COMMENTS_ERROR:
      return {
        ...state,
        err: action.message
      };
    case CLEAR_ERROR:
      return {
        ...state,
        err: null
      };
    default:
      return state;
  }
}

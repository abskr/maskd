import axios from "axios";
import { GET_POSTS, GET_ERRORS } from "./types";

export const getPosts = () => (dispatch) => {
  axios
    .get('/api/posts')
    .then((res) => {
      const data = res.json()
      console.log(data)
      dispatch({
        type: GET_POSTS,
        payload: data
      })
    })
    .catch((err) =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      })
    );
};

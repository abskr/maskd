import axios from "axios"
import setAuthHeader from "../../utils/setAuthHeader";
import {GET_ERRORS, GET_POSTS} from "../types"

const token = localStorage.getItem('jwtToken');
const baseUrl = 'http://localhost:5005';

export const fetchPost = () => (dispatch) => {
  setAuthHeader(token)
  axios
    .get(`${baseUrl}/api/posts`)
    .then((res) => {
      dispatch({
        type: GET_POSTS,
        payload: res.data
      })
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: GET_ERRORS,
        payload: err.response,
      });
    });
};



export const newPost = (postData, history) => (dispatch) => {
  setAuthHeader(token)
  if (!postData.image) {
    axios.post(`${baseUrl}/api/posts`, postData).then((res) => {
      console.log(res.data._id);
      dispatch(fetchPost());
      history.push('/');
    });
  } else {
    axios.post(`${baseUrl}/api/posts`, postData)
    .then((res) => {
      const fd = new FormData()
      fd.append(
        'postImg',
        postData.image,
        postData.image.name
      )
      // console.log(res.data._id);
      const postId = res.data._id
      axios.post(`${baseUrl}/api/posts/${postId}/upload`, fd)
        .then((res) => {
          dispatch(fetchPost());
          history.push('/');
        })
    })
  }
}

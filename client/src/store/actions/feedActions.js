import axios from "axios"
import setAuthHeader from "../../utils/setAuthHeader";

const token = localStorage.getItem('jwtToken');
const baseUrl = 'http://localhost:5005';

export const loginUser = (userData) => (dispatch) => {
  setAuthHeader(token)
  // axios
  //   .post(`${baseUrl}/api/users/login`, userData)
  //   .then((res) => {
  //     // save to localStorage

  //     // set token to localStorage
  //     const { token } = res.data;
  //     localStorage.setItem('jwtToken', token);

  //     // set token to Auth header
  //     setAuthHeader(token);

  //     const decoded = jwt_decode(token);

  //     // set current user
  //     dispatch(setCurrentUser(decoded));
  //   })
  //   .catch((err) => {
  //     console.log(err);
  //     dispatch({
  //       type: GET_ERRORS,
  //       payload: err.response,
  //     });
  //   });
};

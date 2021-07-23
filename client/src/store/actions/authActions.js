import axios from 'axios';
import setAuthHeader from '../../utils/setAuthHeader';
import jwt_decode from 'jwt-decode';

import {
  GET_ERRORS,
  SET_CURRENT_USER,
  USER_LOADING,
  GET_USER_DETAIL,
} from '../types';

const baseUrl = 'http://localhost:5005'
// const token = localStorage.getItem('jwtToken')

export const registerUser = (userData, history) => (dispatch) => {
  axios
    .post(`${baseUrl}/api/users/register`, userData)
    .then((res) => history.push('/'))
    .catch((err) =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      })
    );
};

export const loginUser = (userData) => (dispatch) => {
  axios
    .post(`${baseUrl}/api/users/login`, userData)
    .then((res) => {
      // save to localStorage

      // set token to localStorage
      const { token } = res.data;
      localStorage.setItem('jwtToken', token);

      // set token to Auth header
      setAuthHeader(token);

      const decoded = jwt_decode(token);

      // set current user
      dispatch(setCurrentUser(decoded));
    })
    .catch((err) =>
      {console.log(err)
      dispatch({
        type: GET_ERRORS,
        payload: err.response,
      })}
    );
};

// set logged-in user
export const setCurrentUser = (decoded) => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded,
  };
};

// loading user state
export const setUserLoading = () => {
  return {
    type: USER_LOADING,
  };
};

// log user out
export const logoutUser = () => (dispatch) => {
  // remove token from local storage
  localStorage.removeItem('jwtToken');

  // remove auth header for future request
  setAuthHeader(false);

  // set current user to empty object, set isAuthorized
  dispatch(setCurrentUser({}));
};

// get user details
export const getUserDetail = () => async (dispatch) => {
  const res = await axios.get(`${baseUrl}/api/users/me`)
  dispatch({
    type: GET_USER_DETAIL,
    payload: {
      followers: res.data.followers,
      following: res.data.following
    }
  });
}
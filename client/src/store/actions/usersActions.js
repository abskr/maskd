import axios from 'axios';
import setAuthHeader from '../../utils/setAuthHeader';
import { GET_SELECTED_USER, GET_ERRORS } from '../types';

const token = localStorage.getItem('jwtToken');

const baseUrl = 'http://localhost:5005'

export const getUserByUsername = (username) => async(dispatch) => {
  try {
    setAuthHeader(token)
    const res = await axios.get(`${baseUrl}/api/users/${username}`)
    // console.log(res)
    dispatch({
      type: GET_SELECTED_USER,
      payload: res.data
    })
  } catch (err) {
    console.log(err);
    dispatch({
      type: GET_ERRORS,
      payload: err.response,
    });
  }

}
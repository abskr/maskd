import isEmpty from 'is-empty';
import { SET_CURRENT_USER, USER_LOADING, GET_USER_DETAIL } from '../types';

const initialState = {
  isAuthenticated: false,
  user: {},
  followers: [],
  following: [],
  loading: false,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_CURRENT_USER:
      return {
        ...state,
        isAuthenticated: !isEmpty(action.payload),
        user: action.payload,
      };
    case GET_USER_DETAIL:
      return {
        ...state,
        followers: action.payload.followers,
        following: action.payload.following
      }
    case USER_LOADING:
      return {
        ...state,
        loading: true,
      };
    default:
      return state;
  }
};

export default authReducer;

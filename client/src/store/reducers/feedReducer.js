import { GET_POSTS, POSTS_LOADING } from '../types';

const initialState = {
  post: {},
  loading: false,
};

const feedReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_POSTS:
      return {
        ...state,
        posts: action.payload,
      };
    case POSTS_LOADING:
      return {
        ...state,
        loading: true,
      };
    default:
      return state;
  }
};

export default feedReducer;
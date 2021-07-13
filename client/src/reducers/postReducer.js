import { GET_POSTS, POST_LOADING  } from '../actions/types';

const initialState = {
  feeds: [],
  loading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_POSTS:
      return {
        ...state,
        feeds: action.payload
      }
    case POST_LOADING:
      return {
        ...state,
        loading: true
      }
    default:
      return state;
  }
}

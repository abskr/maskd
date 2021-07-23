import { GET_SELECTED_USER } from '../types';

const initialState = {
  selectedUser: {},
  loading: false,
};

const usersReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_SELECTED_USER:
      return {
        ...state,
        selectedUser: action.payload,
      }
    default: 
      return state;
  }
}

export default usersReducer
import axios from 'axios';

const setAuthHeader = (token) => {
  if (token) {
    // apply token (from local storage)
    axios.defaults.headers.common['Authorization'] = token;
  } else {
    // delete auth header
    delete axios.defaults.headers.common['Authorization'];
  }
};

export default setAuthHeader;
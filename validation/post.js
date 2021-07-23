import Validator from 'validator';
import isEmpty from 'is-empty';

const validateLoginInput = (data) => {
  let errors = {};

  // Convert empty fields to an empty string so we can use validator functions
  data.username = !isEmpty(data.username) ? data.username : '';
  data.password = !isEmpty(data.password) ? data.password : '';

  // Username checks
  if (Validator.isEmpty(data.username)) {
    errors.username = 'Username field is required';
  }

  // Password checks
  if (Validator.isEmpty(data.password)) {
    errors.password = 'Password field is required';
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};

export default validateLoginInput;

import { emailErrorMessage, mobileErrorMessage, requiredErrorMessage } from './const';

export const validateEmail = (value) => {
  let error;
  if (!value) {
    error = requiredErrorMessage;
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
    error = emailErrorMessage;
  }
  return error;
};

export const validateMobileNumber = (value) => {
  let error;
  if (!value) {
    error = requiredErrorMessage;
  } else if (!/^[0-9]*$/i.test(value)) {
    error = mobileErrorMessage;
  }
  return error;
};

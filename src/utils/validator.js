// email validation
export const validateEmail = (email) => {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(email);
};

// password validation
export const validatePasswordForSignUp = (password) => {
  const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z]).{6,}$/;
  return passwordRegex.test(password);
};

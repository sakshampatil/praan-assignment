const validateEmail = (email: string) => {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  return emailRegex.test(email);
};

const validatePassword = (password: string) => {
  if (password.length > 7) {
    return true;
  } else {
    return false;
  }
};

const helpers = { validateEmail, validatePassword };

export default helpers;

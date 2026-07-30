import toast from "react-hot-toast";

export const validateEmail = (email) => {
  if (!email?.trim()) {
    toast.error("Email is required.");
    return false;
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailRegex.test(email)) {
    toast.error("Please enter a valid email address.");
    return false;
  }

  return true;
};

export const validateUsername = (username) => {
  if (!username?.trim()) {
    toast.error("Username is required.");
    return false;
  }

  if (username.length < 4) {
    toast.error("Username must be at least 4 characters.");
    return false;
  }

  if (username.length > 20) {
    toast.error("Username cannot exceed 20 characters.");
    return false;
  }

  const usernameRegex = /^[a-zA-Z0-9_]+$/;

  if (!usernameRegex.test(username)) {
    toast.error("Username can only contain letters, numbers and underscore.");
    return false;
  }

  return true;
};

export const validateMobile = (mobile) => {
  if (!mobile?.trim()) {
    toast.error("Mobile number is required.");
    return false;
  }

  const mobileRegex = /^[6-9]\d{9}$/;

  if (!mobileRegex.test(mobile)) {
    toast.error("Please enter a valid mobile number.");
    return false;
  }

  return true;
};

export const validateOTP = (otp) => {
  if (!otp?.trim()) {
    toast.error("OTP is required.");
    return false;
  }

  if (!/^\d{6}$/.test(otp)) {
    toast.error("OTP must be exactly 6 digits.");
    return false;
  }

  return true;
};

export const validatePassword = (password) => {
  if (!password?.trim()) {
    toast.error("Password is required.");
    return false;
  }

  if (password.length < 8) {
    toast.error("Password must be at least 8 characters.");
    return false;
  }

  return true;
};

export const validateRegister = (formData) => {
  const {
    firstName,
    username,
    email,
    mobile,
    password,
    confirmPassword,
    acceptedTerms,
  } = formData;

  if (!firstName?.trim()) {
    toast.error("First name is required.");
    return false;
  }

  if (!validateUsername(username)) return false;

  if (!validateEmail(email)) return false;

  if (!validateMobile(mobile)) return false;

  if (!validatePassword(password)) return false;

  if (!confirmPassword?.trim()) {
    toast.error("Confirm password is required.");
    return false;
  }

  if (password !== confirmPassword) {
    toast.error("Passwords do not match.");
    return false;
  }

  if (!acceptedTerms) {
    toast.error("Please accept the Terms & Conditions.");
    return false;
  }

  return true;
};

export const validateLogin = ({ email, username, mobile, password }) => {
  if (!email?.trim() && !username?.trim() && !mobile?.trim()) {
    toast.error("Please enter email, username or mobile.");
    return false;
  }

  if (email && !validateEmail(email)) return false;

  if (username && !validateUsername(username)) return false;

  if (mobile && !validateMobile(mobile)) return false;

  if (!validatePassword(password)) return false;

  return true;
};

export const validateForgotPassword = ({ mobile }) => {
  return validateMobile(mobile);
};

export const validateResetPassword = ({ password, confirmPassword }) => {
  if (!validatePassword(password)) return false;

  if (!confirmPassword?.trim()) {
    toast.error("Confirm password is required.");
    return false;
  }

  if (password !== confirmPassword) {
    toast.error("Passwords do not match.");
    return false;
  }

  return true;
};

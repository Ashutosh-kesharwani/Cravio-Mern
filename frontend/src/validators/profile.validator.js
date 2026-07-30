import toast from "react-hot-toast";
import validator from "validator";

/* ---------------- First Name ---------------- */

export const validateFirstName = (firstName) => {
  if (!firstName?.trim()) {
    toast.error("First name is required.");
    return false;
  }

  if (firstName.trim().length < 2) {
    toast.error("First name must be at least 2 characters.");
    return false;
  }

  return true;
};

/* ---------------- Last Name ---------------- */

export const validateLastName = (lastName) => {
  if (!lastName?.trim()) return true;

  if (lastName.trim().length < 2) {
    toast.error("Last name must be at least 2 characters.");
    return false;
  }

  return true;
};

/* ---------------- Username ---------------- */

export const validateUsername = (username) => {
  if (!username?.trim()) {
    toast.error("Username is required.");
    return false;
  }

  if (!validator.isLength(username.trim(), { min: 3, max: 20 })) {
    toast.error("Username must be between 3 and 20 characters.");
    return false;
  }

  if (!validator.matches(username.trim(), /^[a-zA-Z0-9._]+$/)) {
    toast.error(
      "Username can only contain letters, numbers, dots and underscores."
    );
    return false;
  }

  return true;
};

/* ---------------- Email ---------------- */

export const validateEmail = (email) => {
  if (!email?.trim()) {
    toast.error("Email is required.");
    return false;
  }

  if (!validator.isEmail(email.trim())) {
    toast.error("Please enter a valid email address.");
    return false;
  }

  return true;
};

/* ---------------- DOB ---------------- */

export const validateDOB = (dob) => {
  if (!dob) return true;

  const selectedDate = new Date(dob);
  const today = new Date();

  if (selectedDate > today) {
    toast.error("Date of birth cannot be in the future.");
    return false;
  }

  return true;
};

/* ---------------- Complete Profile ---------------- */

export const validateProfile = (formData) => {
  const { firstName, lastName, dob } = formData;

  if (!validateFirstName(firstName)) return false;

  if (!validateLastName(lastName)) return false;

  if (!validateDOB(dob)) return false;

  return true;
};

/* ---------------- Password ---------------- */

export const validatePassword = (password) => {
  if (!password.trim()) {
    toast.error("Password is required.");
    return false;
  }

  if (
    !validator.isStrongPassword(password, {
      minLength: 8,
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 1,
      minSymbols: 1,
    })
  ) {
    toast.error(
      "Password must contain uppercase, lowercase, number and special character."
    );

    return false;
  }

  return true;
};

/* ---------------- Change Password ---------------- */

export const validateChangePassword = ({
  currentPassword,
  newPassword,
  confirmPassword,
}) => {
  if (!currentPassword.trim()) {
    toast.error("Current password is required.");
    return false;
  }

  if (!validatePassword(newPassword)) return false;

  if (newPassword !== confirmPassword) {
    toast.error("New password and current password must be same");
    return false;
  }

  if (currentPassword === newPassword) {
    toast.error("New password must be different from current password.");
    return false;
  }

  return true;
};

export const validateAddress = ({
  receiverName,
  street,
  city,
  state,
  zipcode,
}) => {
  if (!receiverName.trim()) {
    toast.error("Receiver name is required.");
    return false;
  }

  if (!street.trim()) {
    toast.error("Street is required.");
    return false;
  }

  if (!city.trim()) {
    toast.error("City is required.");
    return false;
  }

  if (!state.trim()) {
    toast.error("State is required.");
    return false;
  }

  if (!validator.isPostalCode(zipcode, "IN")) {
    toast.error("Please enter a valid postal code.");
    return false;
  }

  return true;
};

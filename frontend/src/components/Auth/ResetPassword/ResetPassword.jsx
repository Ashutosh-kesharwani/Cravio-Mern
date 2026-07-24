import "./ResetPassword.css";

import { useState } from "react";

import PasswordInput from "../PasswordInput/PasswordInput";

const ResetPassword = ({ onSuccess }) => {
  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);

  const [errors, setErrors] = useState({
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.password.trim()) {
      newErrors.password = "Password is required.";
    }

    if (!formData.confirmPassword.trim()) {
      newErrors.confirmPassword = "Please confirm your password.";
    }

    if (
      formData.password &&
      formData.confirmPassword &&
      formData.password !== formData.confirmPassword
    ) {
      newErrors.confirmPassword = "Passwords do not match.";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setLoading(true);

    try {
      // ==========================================
      // TODO:
      // await resetPassword({
      //    password: formData.password,
      //    confirmPassword: formData.confirmPassword,
      // });
      // ==========================================

      onSuccess?.();
    } catch (error) {
      console.error(error);

      // Handle API errors here
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="reset-password-form" onSubmit={handleSubmit}>
      <PasswordInput
        label="New Password"
        name="password"
        value={formData.password}
        onChange={handleChange}
        placeholder="Enter your new password"
        error={errors.password}
      />

      <PasswordInput
        label="Confirm Password"
        name="confirmPassword"
        value={formData.confirmPassword}
        onChange={handleChange}
        placeholder="Confirm your new password"
        error={errors.confirmPassword}
      />

      <button
        type="submit"
        className="reset-password-form__btn"
        disabled={loading}
      >
        {loading ? "Updating Password..." : "Reset Password"}
      </button>
    </form>
  );
};

export default ResetPassword;

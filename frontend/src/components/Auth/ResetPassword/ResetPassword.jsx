import "./ResetPassword.css";

import PasswordInput from "../PasswordInput/PasswordInput";

import useResetPassword from "../../../hooks/auth/useResetPassword";

const ResetPassword = () => {
  const {
    formData,

    isSubmitting,

    isResetPasswordValid,

    handleChange,

    handleSubmit,
  } = useResetPassword();

  return (
    <form className="reset-password-form" onSubmit={handleSubmit}>
      <PasswordInput
        label="New Password"
        name="password"
        value={formData.password}
        onChange={handleChange}
        placeholder="Enter your new password"
        required
      />

      <PasswordInput
        label="Confirm Password"
        name="confirmPassword"
        value={formData.confirmPassword}
        onChange={handleChange}
        placeholder="Confirm your new password"
        required
      />

      <button
        type="submit"
        className="auth-btn"
        disabled={!isResetPasswordValid || isSubmitting}
      >
        {isSubmitting ? "Updating Password..." : "Reset Password"}
      </button>
    </form>
  );
};

export default ResetPassword;

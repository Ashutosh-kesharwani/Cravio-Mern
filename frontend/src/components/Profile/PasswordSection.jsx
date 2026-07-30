import PasswordInput from "../Auth/PasswordInput/PasswordInput";

import usePassword from "../../hooks/profile/usePassword.js";

const PasswordSection = () => {
  const {
    formData,

    isSubmitting,

    isPasswordValid,

    handleChange,

    handleSubmit,
  } = usePassword();

  return (
    <section className="card">
      <h2 className="section-title">Change Password</h2>

      <p className="section-subtitle">
        Update your account password. Make sure it's strong and secure.
      </p>

      <form className="form" onSubmit={handleSubmit}>
        <PasswordInput
          label="Current Password"
          name="currentPassword"
          value={formData.currentPassword}
          onChange={handleChange}
          placeholder="Enter current password"
          required
        />

        <PasswordInput
          label="New Password"
          name="newPassword"
          value={formData.newPassword}
          onChange={handleChange}
          placeholder="Enter new password"
          required
        />

        <PasswordInput
          label="Confirm Password"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
          placeholder="Confirm new password"
          required
        />

        <div className="form-actions">
          <button
            type="submit"
            className="btn btn-primary"
            disabled={!isPasswordValid || isSubmitting}
          >
            {isSubmitting ? "Updating..." : "Update Password"}
          </button>
        </div>
      </form>
    </section>
  );
};

export default PasswordSection;

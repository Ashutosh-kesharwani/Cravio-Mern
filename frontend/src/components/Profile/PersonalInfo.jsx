import useProfile from "../../hooks/profile/useProfile.js";

const PersonalInfo = () => {
  const {
    formData,
    username,
    email,

    isSubmitting,
    isUsernameSubmitting,
    isEmailSubmitting,

    isProfileValid,
    isUsernameValid,
    isEmailValid,

    handleChange,
    handleUsernameChange,
    handleEmailChange,

    handleSubmit,
    handleUsernameSubmit,
    handleEmailSubmit,
  } = useProfile();

  return (
    <>
      {/* Personal Information */}
      <section className="card">
        <h2 className="section-title">Personal Information</h2>

        <p className="section-subtitle">
          Update your basic personal information.
        </p>

        <form className="form" onSubmit={handleSubmit}>
          <div className="form-grid">
            <div className="form-group">
              <label className="form-label">First Name</label>

              <input
                type="text"
                name="firstName"
                className="form-input"
                value={formData.firstName}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Last Name</label>

              <input
                type="text"
                name="lastName"
                className="form-input"
                value={formData.lastName}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Date of Birth</label>

            <input
              type="date"
              name="dob"
              className="form-input"
              value={formData.dob}
              onChange={handleChange}
            />
          </div>

          <button
            className="btn btn-primary"
            disabled={!isProfileValid || isSubmitting}
          >
            {isSubmitting ? "Saving..." : "Save Changes"}
          </button>
        </form>
      </section>

      {/* Username */}
      <section className="card">
        <h2 className="section-title">Username</h2>

        <p className="section-subtitle">Change your username.</p>

        <form className="form" onSubmit={handleUsernameSubmit}>
          <div className="form-group">
            <label className="form-label">Username</label>

            <input
              type="text"
              name="username"
              className="form-input"
              value={username}
              onChange={handleUsernameChange}
            />
          </div>

          <button
            className="btn btn-primary"
            disabled={!isUsernameValid || isUsernameSubmitting}
          >
            {isUsernameSubmitting ? "Updating..." : "Update Username"}
          </button>
        </form>
      </section>

      {/* Email */}
      <section className="card">
        <h2 className="section-title">Email Address</h2>

        <p className="section-subtitle">Update your email address.</p>

        <form className="form" onSubmit={handleEmailSubmit}>
          <div className="form-group">
            <label className="form-label">Email Address</label>

            <input
              type="email"
              name="email"
              className="form-input"
              value={email}
              onChange={handleEmailChange}
            />
          </div>

          <button
            className="btn btn-primary"
            disabled={!isEmailValid || isEmailSubmitting}
          >
            {isEmailSubmitting ? "Updating..." : "Update Email"}
          </button>
        </form>
      </section>
    </>
  );
};

export default PersonalInfo;

import { useState } from "react";
import { Navigate } from "react-router-dom";

import useAdmin from "../../../hooks/admin/useAdmin.js";
import "./AdminLogin.css";

import PasswordInput from "../../../components/Auth/PasswordInput/PasswordInput";

const INITIAL_FORM = {
  email: "",
  password: "",
};

const AdminLogin = () => {
  const { isAuthenticated, adminLoading, handleAdminLogin } = useAdmin();

  const [formData, setFormData] = useState(INITIAL_FORM);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      await handleAdminLogin(formData);
    } catch {
      // Already handled inside useAdmin
    }
  };

  if (isAuthenticated) {
    return <Navigate to="/admin" replace />;
  }

  return (
    <section className="admin-login">
      <div className="admin-login__card">
        <h1>Admin Login</h1>

        <p>Sign in to manage Cravio.</p>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Email</label>

            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              required
              autoComplete="username"
            />
          </div>

          <PasswordInput
            label="Password"
            name="password"
            value={formData.password}
            placeholder="Enter your password"
            onChange={handleChange}
            required
            autoComplete="current-password"
            showStrength={false}
          />

          <button
            type="submit"
            disabled={adminLoading.login}
            className="admin-login__button"
          >
            {adminLoading.login ? "Signing In..." : "Login"}
          </button>
        </form>
      </div>
    </section>
  );
};

export default AdminLogin;

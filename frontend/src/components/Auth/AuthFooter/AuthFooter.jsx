import "./AuthFooter.css";

import { AUTH_MODE } from "../../../constants/auth.constants.js";
import { useAuthStore } from "../../../context/authContext.js";

const AuthFooter = () => {
  const { authMode, setAuthMode } = useAuthStore();

  switch (authMode) {
    case AUTH_MODE.LOGIN:
      return (
        <div className="auth-footer">
          <span>Don't have an account?</span>

          <button
            onClick={() => setAuthMode(AUTH_MODE.REGISTER)}
            className="auth-link"
          >
            Create Account
          </button>
        </div>
      );

    case AUTH_MODE.REGISTER:
      return (
        <div className="auth-footer">
          <span>Already have an account?</span>

          <button
            onClick={() => setAuthMode(AUTH_MODE.LOGIN)}
            className="auth-link"
          >
            Sign In
          </button>
        </div>
      );

    case AUTH_MODE.FORGOT_PASSWORD:
      return (
        <div className="auth-footer">
          <span>Remember your password?</span>

          <button
            onClick={() => setAuthMode(AUTH_MODE.LOGIN)}
            className="auth-link"
          >
            Back to Login
          </button>
        </div>
      );

    case AUTH_MODE.RESET_PASSWORD:
      return (
        <div className="auth-footer">
          <span>Password reset successfully?</span>

          <button
            onClick={() => setAuthMode(AUTH_MODE.LOGIN)}
            className="auth-link"
          >
            Login
          </button>
        </div>
      );

    default:
      return null;
  }
};

export default AuthFooter;

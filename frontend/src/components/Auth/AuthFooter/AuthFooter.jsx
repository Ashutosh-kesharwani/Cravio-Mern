import "./AuthFooter.css";

import { AUTH_MODE } from "../../../constants/auth.constants.js";

const AuthFooter = ({ mode, onChangeMode }) => {
  switch (mode) {
    case AUTH_MODE.LOGIN:
      return (
        <div className="auth-footer">
          <span>Don't have an account?</span>

          <button onClick={() => onChangeMode(AUTH_MODE.REGISTER)}>
            Create Account
          </button>
        </div>
      );

    case AUTH_MODE.REGISTER:
      return (
        <div className="auth-footer">
          <span>Already have an account?</span>

          <button onClick={() => onChangeMode(AUTH_MODE.LOGIN)}>Sign In</button>
        </div>
      );

    case AUTH_MODE.FORGOT_PASSWORD:
      return (
        <div className="auth-footer">
          <span>Remember your password?</span>

          <button onClick={() => onChangeMode(AUTH_MODE.LOGIN)}>
            Back to Login
          </button>
        </div>
      );

    case AUTH_MODE.RESET_PASSWORD:
      return (
        <div className="auth-footer">
          <span>Password reset successfully?</span>

          <button onClick={() => onChangeMode(AUTH_MODE.LOGIN)}>Login</button>
        </div>
      );

    default:
      return null;
  }
};

export default AuthFooter;

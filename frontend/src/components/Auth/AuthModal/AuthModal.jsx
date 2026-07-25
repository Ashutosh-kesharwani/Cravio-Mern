import "./AuthModal.css";

import {
  AuthFooter,
  AuthHeader,
  ForgotPassword,
  LoginForm,
  RegisterForm,
  ResetPassword,
} from "../index.js";

import { AUTH_MODE } from "../../../constants/auth.constants.js";
import { useAuthStore } from "../../../context/authContext.js";

const AuthModal = () => {
  const { authMode, isAuthOpen, closeAuth } = useAuthStore();

  if (!isAuthOpen) return null;

  const renderForm = () => {
    switch (authMode) {
      case AUTH_MODE.LOGIN:
        return <LoginForm />;

      case AUTH_MODE.REGISTER:
        return <RegisterForm />;

      case AUTH_MODE.FORGOT_PASSWORD:
        return <ForgotPassword />;

      case AUTH_MODE.RESET_PASSWORD:
        return <ResetPassword />;

      default:
        return null;
    }
  };

  return (
    <div className="auth-modal__backdrop" onClick={closeAuth}>
      <div className="auth-modal" onClick={(e) => e.stopPropagation()}>
        <button className="auth-modal__close" onClick={closeAuth}>
          ✕
        </button>

        <AuthHeader />

        <div className="auth-modal__body">{renderForm()}</div>

        <AuthFooter />
      </div>
    </div>
  );
};

export default AuthModal;

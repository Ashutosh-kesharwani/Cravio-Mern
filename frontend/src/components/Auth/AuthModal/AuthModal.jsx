import "./AuthModal.css";

import { useState } from "react";

import AuthFooter from "../AuthFooter/AuthFooter";
import AuthHeader from "../AuthHeader/AuthHeader";

import ForgotPassword from "../ForgotPassword/ForgotPassword";
import LoginForm from "../LoginForm/LoginForm";
import RegisterForm from "../RegisterForm/RegisterForm";
import ResetPassword from "../ResetPassword/ResetPassword";

import { AUTH_MODE } from "../../../constants/auth.constants.js";

const AuthModal = ({ onClose }) => {
  const [mode, setMode] = useState(AUTH_MODE.LOGIN);

  const renderForm = () => {
    switch (mode) {
      case AUTH_MODE.LOGIN:
        return (
          <LoginForm
            onForgotPassword={() => setMode(AUTH_MODE.FORGOT_PASSWORD)}
          />
        );

      case AUTH_MODE.REGISTER:
        return <RegisterForm />;

      case AUTH_MODE.FORGOT_PASSWORD:
        return (
          <ForgotPassword onSuccess={() => setMode(AUTH_MODE.RESET_PASSWORD)} />
        );

      case AUTH_MODE.RESET_PASSWORD:
        return <ResetPassword onSuccess={() => setMode(AUTH_MODE.LOGIN)} />;

      default:
        return null;
    }
  };

  return (
    <div className="auth-modal__backdrop" onClick={onClose}>
      <div className="auth-modal" onClick={(e) => e.stopPropagation()}>
        <button className="auth-modal__close" onClick={onClose}>
          ✕
        </button>

        <AuthHeader mode={mode} />

        <div className="auth-modal__body">{renderForm()}</div>

        <AuthFooter mode={mode} onChangeMode={setMode} />
      </div>
    </div>
  );
};

export default AuthModal;

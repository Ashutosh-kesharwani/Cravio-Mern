import { AlertTriangle, ArrowLeft, Home, RefreshCw } from "lucide-react";
import { useNavigate } from "react-router-dom";

import "./ErrorState.css";

const ErrorState = ({
  icon = <AlertTriangle size={82} strokeWidth={1.8} />,
  title = "Something Went Wrong",
  subtitle = "An unexpected error occurred. Please try again.",
  code = "ERROR",
  showHome = true,
  showBack = true,
  showRetry = false,
  onRetry,
}) => {
  const navigate = useNavigate();

  return (
    <section className="error-state">
      <div className="error-state__blob error-state__blob--1"></div>
      <div className="error-state__blob error-state__blob--2"></div>

      <div className="error-state__content">
        <div className="error-state__icon-wrapper">{icon}</div>

        <h1 className="error-state__title">{title}</h1>

        <p className="error-state__subtitle">{subtitle}</p>

        <span className="error-state__code">{code}</span>

        <div className="error-state__actions">
          {showRetry && (
            <button
              type="button"
              className="error-state__btn error-state__btn--primary"
              onClick={onRetry}
            >
              <RefreshCw size={18} />
              <span>Try Again</span>
            </button>
          )}

          {showBack && (
            <button
              type="button"
              className="error-state__btn"
              onClick={() => navigate(-1)}
            >
              <ArrowLeft size={18} />
              <span>Go Back</span>
            </button>
          )}

          {showHome && (
            <button
              type="button"
              className="error-state__btn"
              onClick={() => navigate("/")}
            >
              <Home size={18} />
              <span>Home</span>
            </button>
          )}
        </div>
      </div>
    </section>
  );
};

export default ErrorState;

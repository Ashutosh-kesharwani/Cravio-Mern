import "./AuthHeader.css";

import { AUTH_HEADER } from "../../../constants/auth.constants.js";
import { useAuthStore } from "../../../context/authContext.js";

const AuthHeader = () => {
  const { authMode } = useAuthStore();
  const { title, subtitle } = AUTH_HEADER[authMode];

  return (
    <div className="auth-header">
      <h2>{title}</h2>

      <p>{subtitle}</p>
    </div>
  );
};

export default AuthHeader;

import "./AuthHeader.css";

import { AUTH_HEADER } from "../../../constants/auth.constants.js";

const AuthHeader = ({ mode }) => {
  const { title, subtitle } = AUTH_HEADER[mode];

  return (
    <div className="auth-header">
      <h2>{title}</h2>

      <p>{subtitle}</p>
    </div>
  );
};

export default AuthHeader;

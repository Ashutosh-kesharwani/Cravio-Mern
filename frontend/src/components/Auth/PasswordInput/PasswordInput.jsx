import "./PasswordInput.css";

import { Eye, EyeOff, Lock } from "lucide-react";
import { useState } from "react";

const PasswordInput = ({
  label,
  name,
  value,
  placeholder,
  onChange,
  onBlur,
  required = false,
  disabled = false,
  autoComplete = "off",
  error,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="password-input">
      {label && (
        <label className="password-input__label" htmlFor={name}>
          {label}

          {required && <span>*</span>}
        </label>
      )}

      <div
        className={`password-input__field ${
          error ? "password-input__field--error" : ""
        }`}
      >
        <Lock size={18} className="password-input__icon" />

        <input
          id={name}
          name={name}
          type={showPassword ? "text" : "password"}
          value={value}
          placeholder={placeholder}
          onChange={onChange}
          onBlur={onBlur}
          required={required}
          disabled={disabled}
          autoComplete={autoComplete}
        />

        <button
          type="button"
          className="password-input__toggle"
          onClick={() => setShowPassword((prev) => !prev)}
          aria-label={showPassword ? "Hide password" : "Show password"}
        >
          {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
        </button>
      </div>

      {error && <p className="password-input__error">{error}</p>}
    </div>
  );
};

export default PasswordInput;

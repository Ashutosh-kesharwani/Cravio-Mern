import "./AuthInput.css";

const AuthInput = ({
  label,
  type = "text",
  name,
  value,
  placeholder,
  icon: Icon,
  onChange,
  onBlur,
  required = false,
  disabled = false,
  autoComplete = "off",
  error,
}) => {
  return (
    <div className="auth-input">
      {label && (
        <label className="auth-input__label" htmlFor={name}>
          {label}

          {required && <span>*</span>}
        </label>
      )}

      <div
        className={`auth-input__field ${
          error ? "auth-input__field--error" : ""
        }`}
      >
        {Icon && <Icon size={18} className="auth-input__icon" />}

        <input
          id={name}
          name={name}
          type={type}
          value={value}
          placeholder={placeholder}
          onChange={onChange}
          onBlur={onBlur}
          required={required}
          disabled={disabled}
          autoComplete={autoComplete}
        />
      </div>

      {error && <p className="auth-input__error">{error}</p>}
    </div>
  );
};

export default AuthInput;

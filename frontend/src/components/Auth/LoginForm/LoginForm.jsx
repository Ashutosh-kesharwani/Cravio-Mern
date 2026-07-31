import "./LoginForm.css";

import { AtSign, Mail, Smartphone } from "lucide-react";

import { AUTH_MODE, LOGIN_METHOD } from "../../../constants/auth.constants.js";

import { useAuthStore } from "../../../context/authContext.js";

import useLogin from "../../../hooks/auth/useLogin";

import { AuthInput, OTPInput, PasswordInput } from "../index.js";

const LoginForm = () => {
  const { setAuthMode } = useAuthStore();

  const {
    loginMethod,
    formData,

    otpSent,
    otpVerified,
    otpTimer,

    loading,
    isSubmitting,

    isLoginValid,

    handleChange,
    handleOTPChange,

    changeLoginMethod,

    handleSendOTP,
    handleResendOTP,

    handleSubmit,
  } = useLogin();

  return (
    <form className="login-form" onSubmit={handleSubmit} autoComplete="on">
      <div className="login-form__tabs">
        <button
          type="button"
          className={loginMethod === LOGIN_METHOD.EMAIL ? "active" : ""}
          onClick={() => changeLoginMethod(LOGIN_METHOD.EMAIL)}
        >
          <Mail size={18} />
          <span>Email</span>
        </button>

        <button
          type="button"
          className={loginMethod === LOGIN_METHOD.USERNAME ? "active" : ""}
          onClick={() => changeLoginMethod(LOGIN_METHOD.USERNAME)}
        >
          <AtSign size={18} />
          <span>Username</span>
        </button>

        <button
          type="button"
          className={loginMethod === LOGIN_METHOD.MOBILE ? "active" : ""}
          onClick={() => changeLoginMethod(LOGIN_METHOD.MOBILE)}
        >
          <Smartphone size={18} />
          <span>Mobile</span>
        </button>
      </div>
      {/* ---------------- Email ---------------- */}

      {loginMethod === LOGIN_METHOD.EMAIL && (
        <>
          <AuthInput
            label="Email Address"
            name="email"
            type="email"
            icon={Mail}
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email"
            autoComplete="username"
            required
          />

          <PasswordInput
            label="Password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter your password"
            autoComplete="current-password"
            required
            showStrength={false}
          />
        </>
      )}

      {/* ---------------- Username ---------------- */}

      {loginMethod === LOGIN_METHOD.USERNAME && (
        <>
          <AuthInput
            label="Username"
            name="username"
            icon={AtSign}
            value={formData.username}
            onChange={handleChange}
            placeholder="Enter your username"
            required
          />

          <PasswordInput
            label="Password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter your password"
            autoComplete="current-password"
            required
            showStrength={false}
          />
        </>
      )}
      {/* ---------------- Mobile ---------------- */}

      {loginMethod === LOGIN_METHOD.MOBILE && (
        <>
          <AuthInput
            label="Mobile Number"
            name="mobile"
            type="tel"
            icon={Smartphone}
            value={formData.mobile}
            onChange={handleChange}
            placeholder="Enter your mobile number"
            required
          />

          {!otpSent ? (
            <button
              type="button"
              className="auth-btn"
              onClick={handleSendOTP}
              disabled={loading.sendOtp}
            >
              {loading.sendOtp ? "Sending OTP..." : "Send OTP"}
            </button>
          ) : (
            <>
              <OTPInput value={formData.otp} onChange={handleOTPChange} />

              {loading.verifyOtp && (
                <div className="auth-verified">Verifying OTP...</div>
              )}

              {otpVerified && (
                <div className="auth-verified">
                  ✓ Mobile number verified successfully
                </div>
              )}

              {!otpVerified && (
                <button
                  type="button"
                  className="auth-resend"
                  onClick={handleResendOTP}
                  disabled={
                    otpTimer > 0 || loading.verifyOtp || loading.resendOtp
                  }
                >
                  {loading.resendOtp
                    ? "Resending..."
                    : otpTimer > 0
                      ? `Resend OTP in ${otpTimer}s`
                      : "Resend OTP"}
                </button>
              )}

              {otpVerified && (
                <PasswordInput
                  label="Password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter your password"
                  autoComplete="current-password"
                  required
                  showStrength={false}
                />
              )}
            </>
          )}
        </>
      )}
      <button
        type="button"
        className="auth-link"
        onClick={() => setAuthMode(AUTH_MODE.FORGOT_PASSWORD)}
        disabled={isSubmitting}
      >
        Forgot Password?
      </button>

      <button
        type="submit"
        className="auth-btn"
        disabled={!isLoginValid || isSubmitting}
      >
        {isSubmitting ? "Signing In..." : "Sign In"}
      </button>

      <div className="login-form__divider">
        <span>OR</span>
      </div>
    </form>
  );
};

export default LoginForm;

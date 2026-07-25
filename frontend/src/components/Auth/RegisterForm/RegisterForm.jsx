import "./RegisterForm.css";

import { Mail, Smartphone, User } from "lucide-react";

import { AuthInput, OTPInput, PasswordInput } from "../index.js";

import useRegister from "../../../hooks/auth/useRegister.js";

const RegisterForm = () => {
  const {
    step,
    formData,

    otpSent,
    otpVerified,
    otpTimer,

    loading,
    isSubmitting,

    isStepOneValid,
    isStepTwoValid,
    isRegisterValid,

    handleChange,
    handleOTPChange,

    handleNext,
    handlePrev,

    handleSendOTP,
    handleResendOTP,

    handleSubmit,
  } = useRegister();

  return (
    <form className="register-form" onSubmit={handleSubmit} autoComplete="on">
      <div className="register-form__stepper">
        <div className={`register-form__step ${step >= 1 ? "active" : ""}`}>
          <div className="register-form__circle">{step > 1 ? "✓" : "1"}</div>

          <span>Account</span>
        </div>

        <div className={`register-form__line ${step >= 2 ? "active" : ""}`} />

        <div className={`register-form__step ${step >= 2 ? "active" : ""}`}>
          <div className="register-form__circle">{step > 2 ? "✓" : "2"}</div>

          <span>Verify</span>
        </div>

        <div className={`register-form__line ${step >= 3 ? "active" : ""}`} />

        <div className={`register-form__step ${step >= 3 ? "active" : ""}`}>
          <div className="register-form__circle">3</div>

          <span>Security</span>
        </div>
      </div>

      {step === 1 && (
        <>
          <div className="register-form__grid">
            <AuthInput
              label="First Name"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              placeholder="First Name"
              required
              icon={User}
            />

            <AuthInput
              label="Last Name"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              placeholder="Last Name"
              icon={User}
            />
          </div>

          <AuthInput
            label="Username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
            placeholder="Choose a username"
            icon={User}
          />

          <AuthInput
            label="Email Address"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            required
            placeholder="Enter your email"
            autoComplete="username"
            icon={Mail}
          />

          <button
            type="button"
            className="auth-btn"
            onClick={handleNext}
            disabled={!isStepOneValid}
          >
            Continue
          </button>
        </>
      )}

      {step === 2 && (
        <>
          <AuthInput
            label="Mobile Number"
            name="mobile"
            type="tel"
            value={formData.mobile}
            onChange={handleChange}
            required
            placeholder="Enter your mobile number"
            icon={Smartphone}
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
                  ✓ Mobile verified successfully
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
            </>
          )}

          <div className="register-form__actions">
            <button
              type="button"
              className="auth-btn auth-btn--outline"
              onClick={handlePrev}
            >
              ← Back
            </button>

            <button
              type="button"
              className="auth-btn"
              onClick={handleNext}
              disabled={!isStepTwoValid}
            >
              Continue →
            </button>
          </div>
        </>
      )}

      {step === 3 && (
        <>
          <PasswordInput
            label="Password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            placeholder="Create password"
          />

          <PasswordInput
            label="Confirm Password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
            placeholder="Confirm password"
          />

          <label className="register-form__terms">
            <input
              type="checkbox"
              name="acceptedTerms"
              checked={formData.acceptedTerms}
              onChange={handleChange}
            />

            <span>I agree to the Terms of Service and Privacy Policy</span>
          </label>

          <button
            type="submit"
            className="auth-btn"
            disabled={!isRegisterValid || isSubmitting}
          >
            {isSubmitting ? "Creating Account..." : "Create Account"}
          </button>

          <button
            type="button"
            className="auth-btn auth-btn--outline"
            onClick={handlePrev}
            disabled={isSubmitting}
          >
            ← Back
          </button>
        </>
      )}
    </form>
  );
};

export default RegisterForm;

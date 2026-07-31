import "./ForgotPassword.css";

import { Smartphone } from "lucide-react";

import AuthInput from "../AuthInput/AuthInput";
import OTPInput from "../OTPInput/OTPInput";

import useForgotPassword from "../../../hooks/auth/useForgotPassword";

const ForgotPassword = () => {
  const {
    formData,

    otpSent,
    otpVerified,
    otpTimer,

    loading,

    isMobileValid,

    handleChange,
    handleOTPChange,

    handleSendOTP,
    handleResendOTP,

    handleContinue,
  } = useForgotPassword();

  return (
    <form className="forgot-password-form">
      <AuthInput
        label="Mobile Number"
        name="mobile"
        type="tel"
        value={formData.mobile}
        onChange={handleChange}
        placeholder="Enter your registered mobile number"
        icon={Smartphone}
        required
        disabled={otpSent}
      />

      {!otpSent ? (
        <button
          type="button"
          className="auth-btn"
          onClick={handleSendOTP}
          disabled={!isMobileValid || loading.sendOtp}
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
              ✓ Mobile number verified successfully.
            </div>
          )}

          {!otpVerified && (
            <button
              type="button"
              className="auth-resend"
              onClick={handleResendOTP}
              disabled={otpTimer > 0 || loading.verifyOtp || loading.resendOtp}
            >
              {loading.resendOtp
                ? "Resending..."
                : otpTimer > 0
                  ? `Resend OTP in ${otpTimer}s`
                  : "Resend OTP"}
            </button>
          )}

          {otpVerified && (
            <button type="button" className="auth-btn" onClick={handleContinue}>
              Continue
            </button>
          )}
        </>
      )}
    </form>
  );
};

export default ForgotPassword;

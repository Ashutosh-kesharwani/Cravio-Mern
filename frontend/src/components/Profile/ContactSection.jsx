import OTPInput from "../Auth/OTPInput/OTPInput";

import useContact from "../../hooks/profile/useContact.js";

const ContactSection = () => {
  const {
    user,

    formData,

    otpSent,
    otpVerified,
    otpTimer,

    loading,
    isSubmitting,

    handleChange,
    handleOTPChange,

    handleSendOTP,
    handleResendOTP,

    handleSubmit,
  } = useContact();

  return (
    <section className="card">
      <h2 className="section-title">Contact Number</h2>

      <p className="section-subtitle">Update your registered mobile number.</p>

      <form className="form" onSubmit={handleSubmit}>
        {/* Current Number */}

        <div className="form-group">
          <label className="form-label">Current Number</label>

          <input className="form-input" value={user.mobile} disabled />
        </div>

        {/* New Number */}

        <div className="form-group">
          <label className="form-label">New Number</label>

          <div className="input-with-button">
            <input
              type="tel"
              name="mobile"
              className="form-input"
              placeholder="Enter new number"
              value={formData.mobile}
              onChange={handleChange}
            />
          </div>
        </div>

        {/* OTP Section */}

        {!otpSent ? (
          <button
            type="button"
            className="btn btn-outline"
            onClick={handleSendOTP}
            disabled={loading.sendOtp}
          >
            {loading.sendOtp ? "Sending OTP..." : "Send OTP"}
          </button>
        ) : (
          <>
            {!otpVerified ? (
              <>
                <OTPInput value={formData.otp} onChange={handleOTPChange} />

                {loading.verifyOtp && (
                  <p className="text-info">Verifying OTP...</p>
                )}

                <div className="otp-actions">
                  <button
                    type="button"
                    className="btn btn-outline"
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
                </div>
              </>
            ) : (
              <div className="text-success">
                ✓ Mobile number verified successfully.
              </div>
            )}
          </>
        )}

        {/* Submit */}

        <button
          type="submit"
          className="btn btn-primary"
          disabled={!otpVerified || isSubmitting || loading.verifyOtp}
        >
          {isSubmitting ? "Updating..." : "Update Number"}
        </button>
      </form>
    </section>
  );
};

export default ContactSection;

import "./ForgotPassword.css";

import { Smartphone } from "lucide-react";
import { useEffect, useState } from "react";

import AuthInput from "../AuthInput/AuthInput";
import OTPInput from "../OTPInput/OTPInput";

const ForgotPassword = ({ onSuccess }) => {
  const [mobile, setMobile] = useState("");
  const [otp, setOtp] = useState("");

  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);

  const [timer, setTimer] = useState(30);

  const [loading, setLoading] = useState({
    sendOtp: false,
    verifyOtp: false,
  });

  const [errors, setErrors] = useState({
    mobile: "",
    otp: "",
  });

  /* -------------------- OTP Timer -------------------- */

  useEffect(() => {
    if (!otpSent || timer <= 0) return;

    const interval = setInterval(() => {
      setTimer((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [otpSent, timer]);

  /* -------------------- Send OTP -------------------- */

  const handleSendOTP = async () => {
    if (!mobile.trim()) {
      setErrors((prev) => ({
        ...prev,
        mobile: "Mobile number is required.",
      }));
      return;
    }

    setErrors({
      mobile: "",
      otp: "",
    });

    setLoading((prev) => ({
      ...prev,
      sendOtp: true,
    }));

    try {
      // await forgotPasswordSendOTP(mobile);

      setTimeout(() => {
        setOtpSent(true);
        setTimer(30);

        setLoading((prev) => ({
          ...prev,
          sendOtp: false,
        }));
      }, 700);
    } catch (error) {
      console.error(error);

      setLoading((prev) => ({
        ...prev,
        sendOtp: false,
      }));
    }
  };

  /* -------------------- OTP Change -------------------- */

  const handleOTPChange = (value) => {
    setOtp(value);

    setErrors((prev) => ({
      ...prev,
      otp: "",
    }));

    if (value.length === 6 && !loading.verifyOtp && !otpVerified) {
      handleVerifyOTP(value);
    }
  };

  /* -------------------- Verify OTP -------------------- */

  const handleVerifyOTP = async (enteredOtp) => {
    setLoading((prev) => ({
      ...prev,
      verifyOtp: true,
    }));

    try {
      // await verifyForgotPasswordOTP({
      //   mobile,
      //   otp: enteredOtp,
      // });

      setTimeout(() => {
        setOtpVerified(true);

        setLoading((prev) => ({
          ...prev,
          verifyOtp: false,
        }));
      }, 700);
    } catch (error) {
      console.error(error);

      setLoading((prev) => ({
        ...prev,
        verifyOtp: false,
      }));
    }
  };

  /* -------------------- Resend OTP -------------------- */

  const handleResendOTP = async () => {
    if (timer > 0) return;

    // await forgotPasswordSendOTP(mobile);

    setOtp("");

    setOtpVerified(false);

    setTimer(30);
  };

  /* -------------------- Continue -------------------- */

  const handleContinue = () => {
    onSuccess?.();
  };

  return (
    <form className="forgot-password-form">
      <AuthInput
        label="Mobile Number"
        name="mobile"
        type="tel"
        value={mobile}
        onChange={(e) => setMobile(e.target.value)}
        placeholder="Enter your registered mobile number"
        icon={Smartphone}
        error={errors.mobile}
        disabled={otpSent}
      />

      {!otpSent ? (
        <button
          type="button"
          className="forgot-password-form__btn"
          onClick={handleSendOTP}
          disabled={loading.sendOtp}
        >
          {loading.sendOtp ? "Sending OTP..." : "Send OTP"}
        </button>
      ) : (
        <>
          <OTPInput value={otp} onChange={handleOTPChange} />

          {loading.verifyOtp && (
            <div className="forgot-password-form__success">
              Verifying OTP...
            </div>
          )}

          {otpVerified && (
            <div className="forgot-password-form__success">
              ✓ Mobile number verified successfully.
            </div>
          )}

          {!otpVerified && (
            <button
              type="button"
              className="forgot-password-form__resend"
              disabled={timer > 0 || loading.verifyOtp}
              onClick={handleResendOTP}
            >
              {timer > 0 ? `Resend OTP in ${timer}s` : "Resend OTP"}
            </button>
          )}
        </>
      )}

      {otpVerified && (
        <button
          type="button"
          className="forgot-password-form__btn"
          onClick={handleContinue}
        >
          Continue
        </button>
      )}
    </form>
  );
};

export default ForgotPassword;

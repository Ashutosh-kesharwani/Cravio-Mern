import "./RegisterForm.css";

import { Mail, Smartphone, User } from "lucide-react";
import { useEffect, useState } from "react";

import AuthInput from "../AuthInput/AuthInput";
import OTPInput from "../OTPInput/OTPInput";
import PasswordInput from "../PasswordInput/PasswordInput";

const RegisterForm = () => {
  const [step, setStep] = useState(1);
  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const [otpTimer, setOtpTimer] = useState(30);

  const [loading, setLoading] = useState({
    sendOtp: false,
    verifyOtp: false,
  });
  useEffect(() => {
    if (!otpSent || otpTimer <= 0) return;

    const timer = setInterval(() => {
      setOtpTimer((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [otpSent, otpTimer]);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    mobile: "",
    otp: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleOTPChange = async (otp) => {
    setFormData((prev) => ({
      ...prev,
      otp,
    }));

    if (otp.length !== 6 || loading.verifyOtp || otpVerified) return;

    setLoading((prev) => ({
      ...prev,
      verifyOtp: true,
    }));

    try {
      // await verifyRegisterOTP(formData.mobile, otp);

      setTimeout(() => {
        setOtpVerified(true);

        setLoading((prev) => ({
          ...prev,
          verifyOtp: false,
        }));
      }, 700);
    } catch {
      setLoading((prev) => ({
        ...prev,
        verifyOtp: false,
      }));
    }
  };
  const handleResendOTP = async () => {
    if (otpTimer > 0) return;

    // Later:
    // await resendRegisterOTP(formData.mobile);

    setFormData((prev) => ({
      ...prev,
      otp: "",
    }));

    setOtpVerified(false);
    setOtpTimer(30);

    // If you have sendOtp loading:
    // setLoading((prev) => ({
    //   ...prev,
    //   sendOtp: false,
    // }));
  };

  return (
    <form className="register-form">
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
            placeholder="Choose a username"
            icon={User}
          />

          <AuthInput
            label="Email Address"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email"
            icon={Mail}
          />

          <button
            type="button"
            className="register-form__btn"
            onClick={() => setStep(2)}
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
            placeholder="Enter your mobile number"
            icon={Smartphone}
          />
          {!otpSent ? (
            <button
              type="button"
              className="register-form__otp-btn"
              onClick={() => {
                setOtpSent(true);
                setOtpTimer(30);
              }}
            >
              Send OTP
            </button>
          ) : (
            <>
              <OTPInput value={formData.otp} onChange={handleOTPChange} />

              {loading.verifyOtp && (
                <div className="register-form__verified">Verifying OTP...</div>
              )}

              {otpVerified && (
                <div className="register-form__verified">
                  ✓ Mobile verified successfully
                </div>
              )}

              {!otpVerified && (
                <button
                  type="button"
                  className="register-form__resend"
                  disabled={otpTimer > 0 || loading.verifyOtp}
                  onClick={handleResendOTP}
                >
                  {otpTimer > 0 ? `Resend OTP in ${otpTimer}s` : "Resend OTP"}
                </button>
              )}
            </>
          )}

          <div className="register-form__actions">
            <button
              type="button"
              className="register-form__back"
              onClick={() => setStep(1)}
            >
              ← Back
            </button>

            <button
              type="button"
              className="register-form__btn"
              disabled={!otpVerified}
              onClick={() => setStep(3)}
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
            placeholder="Create password"
          />

          <PasswordInput
            label="Confirm Password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            placeholder="Confirm password"
          />

          <label className="register-form__terms">
            <input type="checkbox" />
            <span>I agree to the Terms of Service and Privacy Policy</span>
          </label>

          <button type="submit" className="register-form__btn">
            Create Account
          </button>

          <button
            type="button"
            className="register-form__back"
            onClick={() => setStep(2)}
          >
            Back
          </button>
        </>
      )}
    </form>
  );
};
export default RegisterForm;

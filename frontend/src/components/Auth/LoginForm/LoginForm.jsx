import "./LoginForm.css";

import { useEffect, useState } from "react";

import { AtSign, Mail, Smartphone } from "lucide-react";

import { AuthInput, OTPInput, PasswordInput } from "../index.js";

const LOGIN_METHOD = {
  EMAIL: "email",
  USERNAME: "username",
  MOBILE: "mobile",
};

const INITIAL_FORM = {
  email: "",
  username: "",
  mobile: "",
  otp: "",
  password: "",
};
/* 

Bad me add
const changeLoginMethod = (method) => {
  if (method === loginMethod) return;

  setLoginMethod(method);

  setFormData(INITIAL_FORM);

  setOtpSent(false);

  setOtpVerified(false);

  setOtpTimer(30);

  setLoading({
    sendOtp: false,
    verifyOtp: false,
    login: false,
  });

  setErrors({});
};
*/

const LoginForm = ({ onForgotPassword }) => {
  const [loginMethod, setLoginMethod] = useState(LOGIN_METHOD.EMAIL);

  const [formData, setFormData] = useState(INITIAL_FORM);

  const [otpSent, setOtpSent] = useState(false);

  const [otpVerified, setOtpVerified] = useState(false);

  const [otpTimer, setOtpTimer] = useState(30);

  const [loading, setLoading] = useState({
    sendOtp: false,
    verifyOtp: false,
    login: false,
  });

  const [errors, setErrors] = useState({});

  /* -------------------- Form Change -------------------- */

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  /* -------------------- OTP Change -------------------- */

  const handleOTPChange = (otp) => {
    setFormData((prev) => ({
      ...prev,
      otp,
    }));

    setErrors((prev) => ({
      ...prev,
      otp: "",
    }));

    if (otp.length === 6 && !loading.verifyOtp && !otpVerified) {
      handleVerifyOTP();
    }
  };

  /* -------------------- Login Method Change -------------------- */

  const changeLoginMethod = (method) => {
    setLoginMethod(method);

    setFormData(INITIAL_FORM);

    setOtpSent(false);

    setOtpVerified(false);

    setOtpTimer(30);

    setErrors({});
  };

  /* -------------------- Send OTP -------------------- */

  const handleSendOTP = async () => {
    if (!formData.mobile.trim()) {
      setErrors((prev) => ({
        ...prev,
        mobile: "Please enter your mobile number.",
      }));
      return;
    }

    setLoading((prev) => ({
      ...prev,
      sendOtp: true,
    }));

    try {
      // await sendOTP(formData.mobile);

      setTimeout(() => {
        setOtpSent(true);

        setOtpTimer(30);

        setLoading((prev) => ({
          ...prev,
          sendOtp: false,
        }));
      }, 800);
    } catch (error) {
      console.log(error);

      setLoading((prev) => ({
        ...prev,
        sendOtp: false,
      }));
    }
  };

  useEffect(() => {
    console.log("otpSent changed =>", otpSent);
  }, [otpSent]);

  /* -------------------- Verify OTP -------------------- */
  const handleVerifyOTP = async () => {
    setLoading((prev) => ({
      ...prev,
      verifyOtp: true,
    }));

    try {
      // await verifyLoginOTP(formData.mobile, formData.otp);

      setTimeout(() => {
        setOtpVerified(true);

        setLoading((prev) => ({
          ...prev,
          verifyOtp: false,
        }));
      }, 800);
    } catch (error) {
      console.error(error);

      setLoading((prev) => ({
        ...prev,
        verifyOtp: false,
      }));
    }
  };
  /* -------------------- Login -------------------- */

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation + API Later

    setLoading((prev) => ({
      ...prev,
      login: true,
    }));

    setTimeout(() => {
      setLoading((prev) => ({
        ...prev,
        login: false,
      }));
    }, 1200);
  };

  /* -------------------- OTP Timer -------------------- */

  useEffect(() => {
    if (!otpSent) return;

    if (otpTimer <= 0) return;

    const timer = setInterval(() => {
      setOtpTimer((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [otpSent, otpTimer]);

  /* -------------------- Resend OTP -------------------- */

  const handleResendOTP = async () => {
    if (otpTimer > 0) return;

    // await resendLoginOTP(formData.mobile);

    setFormData((prev) => ({
      ...prev,
      otp: "",
    }));

    setOtpVerified(false);
    setOtpTimer(30);
  };

  /* ==================== JSX BELOW ==================== */

  return (
    <form className="login-form" onSubmit={handleSubmit}>
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

      {/* EMAIL */}

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
            error={errors.email}
          />

          <PasswordInput
            label="Password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter your password"
            error={errors.password}
          />
        </>
      )}

      {/* USERNAME */}

      {loginMethod === LOGIN_METHOD.USERNAME && (
        <>
          <AuthInput
            label="Username"
            name="username"
            icon={AtSign}
            value={formData.username}
            onChange={handleChange}
            placeholder="Enter your username"
            error={errors.username}
          />

          <PasswordInput
            label="Password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter your password"
            error={errors.password}
          />
        </>
      )}

      {/* MOBILE */}

      {loginMethod === LOGIN_METHOD.MOBILE && (
        <>
          <AuthInput
            label="Mobile Number"
            name="mobile"
            type="tel"
            icon={Smartphone}
            value={formData.mobile}
            onChange={handleChange}
            placeholder="Enter mobile number"
            error={errors.mobile}
          />

          {!otpSent ? (
            <button
              type="button"
              className="login-form__otp-btn"
              onClick={handleSendOTP}
              disabled={loading.sendOtp}
            >
              {loading.sendOtp ? "Sending..." : "Send OTP"}
            </button>
          ) : (
            <>
              <OTPInput value={formData.otp} onChange={handleOTPChange} />

              {loading.verifyOtp && (
                <div className="login-form__verified">Verifying OTP...</div>
              )}

              {otpVerified && (
                <div className="login-form__verified">
                  ✓ Mobile Number Verified
                </div>
              )}

              {!otpVerified && (
                <button
                  type="button"
                  className="login-form__resend"
                  disabled={otpTimer > 0 || loading.verifyOtp}
                  onClick={handleResendOTP}
                >
                  {otpTimer > 0 ? `Resend OTP in ${otpTimer}s` : "Resend OTP"}
                </button>
              )}

              {otpVerified && (
                <PasswordInput
                  label="Password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter your password"
                  error={errors.password}
                />
              )}
            </>
          )}
        </>
      )}

      <button
        type="button"
        className="login-form__forgot"
        onClick={onForgotPassword}
      >
        Forgot Password?
      </button>

      <button
        type="submit"
        className="login-form__submit"
        disabled={
          loading.login || (loginMethod === LOGIN_METHOD.MOBILE && !otpVerified)
        }
      >
        {loading.login ? "Signing In..." : "Sign In"}
      </button>

      <div className="login-form__divider">
        <span>OR</span>
      </div>
    </form>
  );
};

export default LoginForm;

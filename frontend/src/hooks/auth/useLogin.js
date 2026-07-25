import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import { LOGIN_METHOD } from "../../constants/auth.constants.js";
import { OTP_PURPOSE } from "../../constants/otp.constants.js";

import { useAuthStore } from "../../context/authContext.js";

import { login as loginUser } from "../../services/auth.service.js";

import { validateLogin, validateOTP } from "../../validators/auth.validator.js";

import useOTP from "./useOTP";

/* ---------------- Initial Form ---------------- */

const INITIAL_FORM_DATA = {
  email: "",
  username: "",
  mobile: "",
  otp: "",
  password: "",
};

const useLogin = () => {
  const { login, user } = useAuthStore();

  const [loginMethod, setLoginMethod] = useState(LOGIN_METHOD.EMAIL);

  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState(INITIAL_FORM_DATA);

  const {
    otpSent,
    otpVerified,
    otpTimer,
    loading,

    handleSendOTP,
    handleVerifyOTP,
    handleResendOTP,
    resetOTP,
  } = useOTP(() => formData.mobile, OTP_PURPOSE.LOGIN);

  /* ---------------- Form Change ---------------- */

  const handleChange = ({ target }) => {
    const { name, value } = target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  /* ---------------- OTP ---------------- */

  const handleOTPChange = async (otp) => {
    setFormData((prev) => ({
      ...prev,
      otp,
    }));

    if (otp.length !== 6) return;

    if (!validateOTP(otp)) return;

    await handleVerifyOTP(otp);
  };

  /* ---------------- Login Method ---------------- */

  const changeLoginMethod = (method) => {
    if (method === loginMethod) return;

    setLoginMethod(method);

    setFormData(INITIAL_FORM_DATA);

    resetOTP();
  };

  /* ---------------- Validation ---------------- */

  const hasIdentifier =
    formData.email.trim() || formData.username.trim() || formData.mobile.trim();

  const isLoginValid = hasIdentifier && formData.password.trim();

  /* ---------------- Submit ---------------- */

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (isSubmitting) return;

    if (!validateLogin(formData)) return;

    if (loginMethod === LOGIN_METHOD.MOBILE && !otpVerified) {
      toast.error("Please verify your mobile number.");
      return;
    }

    setIsSubmitting(true);

    try {
      const payload = {
        password: formData.password,
      };

      switch (loginMethod) {
        case LOGIN_METHOD.EMAIL:
          payload.email = formData.email;
          break;

        case LOGIN_METHOD.USERNAME:
          payload.username = formData.username;
          break;

        case LOGIN_METHOD.MOBILE:
          payload.mobile = formData.mobile;
          break;

        default:
          break;
      }

      const response = await loginUser(payload);

      toast.success(response.message);
      login(response.data.user);

      setFormData(INITIAL_FORM_DATA);

      resetOTP();
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          error.message ||
          "Something went wrong."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    console.log({ user });
  }, [user]);
  return {
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
  };
};

export default useLogin;

import { useState } from "react";
import toast from "react-hot-toast";

import { AUTH_MODE } from "../../constants/auth.constants.js";
import { OTP_PURPOSE } from "../../constants/otp.constants.js";

import { useAuthStore } from "../../context/authContext.js";

import {
  validateForgotPassword,
  validateOTP,
} from "../../validators/auth.validator.js";

import useOTP from "./useOTP";

const INITIAL_FORM_DATA = {
  mobile: "",
  otp: "",
};

const useForgotPassword = () => {
  const { setAuthMode } = useAuthStore();

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
  } = useOTP(() => formData.mobile, OTP_PURPOSE.FORGOT_PASSWORD);

  const handleChange = ({ target }) => {
    const { name, value } = target;

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

    if (otp.length !== 6) return;

    if (!validateOTP(otp)) return;

    await handleVerifyOTP(otp);
  };

  const isMobileValid = formData.mobile.trim();

  const handleContinue = () => {
    if (!validateForgotPassword(formData)) return;

    if (!otpVerified) {
      toast.error("Please verify your mobile number.");
      return;
    }

    setAuthMode(AUTH_MODE.RESET_PASSWORD);
  };

  return {
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

    resetOTP,
  };
};

export default useForgotPassword;

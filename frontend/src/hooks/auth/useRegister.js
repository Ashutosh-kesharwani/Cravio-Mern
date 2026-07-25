import { useState } from "react";
import toast from "react-hot-toast";

import { AUTH_MODE } from "../../constants/auth.constants.js";
import { OTP_PURPOSE } from "../../constants/otp.constants.js";

import { useAuthStore } from "../../context/authContext.js";

import { register } from "../../services/auth.service.js";

import {
  validateEmail,
  validateOTP,
  validateRegister,
  validateUsername,
} from "../../validators/auth.validator.js";

import useOTP from "./useOTP";

/* ---------------- Initial Form ---------------- */

const INITIAL_FORM_DATA = {
  firstName: "",
  lastName: "",
  username: "",
  email: "",
  mobile: "",
  otp: "",
  password: "",
  confirmPassword: "",
  acceptedTerms: false,
};

const useRegister = () => {
  const { setAuthMode } = useAuthStore();

  const [step, setStep] = useState(1);

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
  } = useOTP(() => formData.mobile, OTP_PURPOSE.REGISTER);

  /* ---------------- Form Change ---------------- */

  const handleChange = ({ target }) => {
    const { name, value, type, checked } = target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
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

  /* ---------------- Step ---------------- */

  const isStepOneValid =
    formData.firstName.trim() &&
    formData.username.trim() &&
    formData.email.trim();

  const isStepTwoValid = formData.mobile.trim() && otpVerified;

  const isRegisterValid =
    formData.password.trim() &&
    formData.confirmPassword.trim() &&
    formData.acceptedTerms;

  const handleNext = () => {
    if (step === 1) {
      if (!validateUsername(formData.username)) return;

      if (!validateEmail(formData.email)) return;
    }

    if (step === 2) {
      if (!otpVerified) {
        toast.error("Please verify your mobile number.");
        return;
      }
    }
    setStep((prev) => prev + 1);
  };

  const handlePrev = () => {
    if (step === 1) return;

    setStep((prev) => prev - 1);
  };

  /* ---------------- Submit ---------------- */

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (isSubmitting) return;

    if (!otpVerified) {
      toast.error("Please verify your mobile number.");
      return;
    }

    if (!validateRegister(formData)) return;

    setIsSubmitting(true);

    try {
      // Send user all field except otp , confirmPassword , acceptedTerms
      const {
        otp: _otp,
        confirmPassword: _confirmPassword,
        acceptedTerms: _acceptedTerms,
        ...payload
      } = formData;

      const response = await register(payload);

      toast.success(response.message);

      resetOTP();

      setStep(1);

      setFormData(INITIAL_FORM_DATA);

      setAuthMode(AUTH_MODE.LOGIN);
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

  return {
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
  };
};

export default useRegister;

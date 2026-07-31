import { useState } from "react";
import toast from "react-hot-toast";

import { useAuthStore } from "../../context/authContext.js";

import { updateContactNumber } from "../../services/user.service.js";

import { OTP_PURPOSE } from "../../constants/otp.constants.js";

import useOTP from "../auth/useOTP.js";

import {
  validateMobile,
  validateOTP,
} from "../../validators/auth.validator.js";

const INITIAL_FORM_DATA = {
  mobile: "",
  otp: "",
};

const useContact = () => {
  const { user, updateUser } = useAuthStore();

  const [formData, setFormData] = useState(INITIAL_FORM_DATA);

  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    otpSent,
    otpVerified,
    otpTimer,

    loading,

    handleSendOTP,
    handleVerifyOTP,
    handleResendOTP,
    resetOTP,
  } = useOTP(() => formData.mobile, OTP_PURPOSE.CHANGE_CONTACT_NUMBER);

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

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!otpVerified) {
      toast.error("Please verify your OTP.");

      return;
    }

    if (!validateMobile(formData.mobile)) return;

    setIsSubmitting(true);

    try {
      const response = await updateContactNumber({
        mobile: formData.mobile,
      });

      updateUser(response.data);

      toast.success(response.message);

      setFormData(INITIAL_FORM_DATA);
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          error.message ||
          "Failed to update contact number."
      );
    } finally {
      setIsSubmitting(false);
      resetOTP();
    }
  };

  return {
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
    handleVerifyOTP,
    handleResendOTP,

    handleSubmit,
  };
};

export default useContact;

import { useEffect, useState } from "react";

import toast from "react-hot-toast";
import { OTP_TIMER } from "../../constants/otp.constants.js";
import { resendOTP, sendOTP, verifyOTP } from "../../services/otp.service.js";
import { validateMobile } from "../../validators/auth.validator.js";

const useOTP = (getMobile, purpose) => {
  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const [otpTimer, setOtpTimer] = useState(0);

  const [loading, setLoading] = useState({
    sendOtp: false,
    verifyOtp: false,
    resendOtp: false,
  });

  useEffect(() => {
    if (!otpSent || otpTimer <= 0) return;

    const timer = setInterval(() => {
      setOtpTimer((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [otpSent, otpTimer]);

  const getCurrentMobile = () => {
    return typeof getMobile === "function" ? getMobile() : getMobile;
  };

  const handleSendOTP = async () => {
    const mobile = getCurrentMobile();

    if (!mobile) return false;
    if (!validateMobile(mobile)) return;

    setLoading((prev) => ({
      ...prev,
      sendOtp: true,
    }));

    try {
      const response = await sendOTP(mobile, purpose);

      setOtpSent(true);
      setOtpVerified(false);
      setOtpTimer(OTP_TIMER);

      return response;
    } catch (error) {
      const message =
        error?.response?.data?.message ||
        error.message ||
        "Something went wrong";
      toast.error(message);
    } finally {
      setLoading((prev) => ({
        ...prev,
        sendOtp: false,
      }));
    }
  };

  const handleVerifyOTP = async (otp) => {
    const mobile = getCurrentMobile();

    if (!mobile || otp.length !== 6) return false;

    if (otpVerified || loading.verifyOtp) return false;

    setLoading((prev) => ({
      ...prev,
      verifyOtp: true,
    }));

    try {
      const response = await verifyOTP(mobile, otp, purpose);

      setOtpVerified(true);

      return response;
    } catch (error) {
      const message =
        error?.response?.data?.message ||
        error.message ||
        "Something went wrong";
      toast.error(message);
    } finally {
      setLoading((prev) => ({
        ...prev,
        verifyOtp: false,
      }));
    }
  };

  const handleResendOTP = async () => {
    const mobile = getCurrentMobile();

    if (!mobile || otpTimer > 0) return false;

    setLoading((prev) => ({
      ...prev,
      resendOtp: true,
    }));

    try {
      const response = await resendOTP(mobile, purpose);

      setOtpVerified(false);
      setOtpTimer(OTP_TIMER);

      return response;
    } catch (error) {
      const message =
        error?.response?.data?.message ||
        error.message ||
        "Something went wrong";
      toast.error(message);
    } finally {
      setLoading((prev) => ({
        ...prev,
        resendOtp: false,
      }));
    }
  };

  const resetOTP = () => {
    setOtpSent(false);
    setOtpVerified(false);
    setOtpTimer(0);
  };

  return {
    otpSent,
    otpVerified,
    otpTimer,
    loading,

    handleSendOTP,
    handleVerifyOTP,
    handleResendOTP,

    resetOTP,
  };
};

export default useOTP;

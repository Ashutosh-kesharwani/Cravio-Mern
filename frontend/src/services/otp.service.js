import api from "../api/axios.js";

/* ---------------- Send OTP ---------------- */

const sendOTP = async (mobile, purpose) => {
  const { data } = await api.post(`/otp/${purpose}/send`, {
    mobile,
  });

  return data;
};

/* ---------------- Verify OTP ---------------- */

const verifyOTP = async (mobile, otp, purpose) => {
  const { data } = await api.post(`/otp/${purpose}/verify`, {
    mobile,
    otp,
  });

  return data;
};

/* ---------------- Resend OTP ---------------- */

const resendOTP = async (mobile, purpose) => {
  const { data } = await api.post(`/otp/${purpose}/resend`, {
    mobile,
  });

  return data;
};

export { resendOTP, sendOTP, verifyOTP };

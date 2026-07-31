import api from "../api/axios.js";

const sendOTP = async (mobile, purpose) => {
  const { data } = await api.post(`/otp/${purpose}/send`, {
    mobile,
  });

  return data;
};

const verifyOTP = async (mobile, otp, purpose) => {
  const { data } = await api.post(`/otp/${purpose}/verify`, {
    mobile,
    otp,
  });

  return data;
};

const resendOTP = async (mobile, purpose) => {
  const { data } = await api.post(`/otp/${purpose}/resend`, {
    mobile,
  });

  return data;
};

export { resendOTP, sendOTP, verifyOTP };

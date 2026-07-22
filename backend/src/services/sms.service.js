import ApiError from "../utils/ApiError.js";

const sendSMS = async (contactNumber, otp) => {
  try {
    console.log("==================================");
    console.log("SMS SERVICE");
    console.log(`To      : ${contactNumber}`);
    console.log(`Message : Your verification OTP is ${otp}`);
    console.log("==================================");

    return true;
  } catch (error) {
    console.error(`sms.service :: sendSMS :: ${error.message}`);

    throw new ApiError(500, "Unable to send SMS. Please try again later.");
  }
};

export default sendSMS;

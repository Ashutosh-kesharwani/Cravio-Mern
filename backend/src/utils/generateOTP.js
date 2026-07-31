import crypto from "crypto";

const generateOTP = (length = 6) => {
  const characters = "123456789";
  let otp = "";

  for (let index = 0; index < length; index++) {
    otp += characters[crypto.randomInt(characters.length)];
  }

  return otp;
};

export default generateOTP;

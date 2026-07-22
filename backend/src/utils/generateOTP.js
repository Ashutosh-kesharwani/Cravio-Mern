import crypto from "crypto";

const generateOTP = (length = 2) => {
  // const characters =
  // "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const characters = "123456";

  let otp = "";

  for (let index = 0; index < length; index++) {
    otp += characters[crypto.randomInt(characters.length)];
  }

  return otp;
};

export default generateOTP;

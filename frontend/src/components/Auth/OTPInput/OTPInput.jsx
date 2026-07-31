import { useRef } from "react";
import "./OTPInput.css";

const OTP_LENGTH = 6;

const OTPInput = ({ value = "", onChange }) => {
  const inputRefs = useRef([]);

  const otp = Array.from(
    { length: OTP_LENGTH },
    (_, index) => value[index] || ""
  );

  const handleChange = (index, e) => {
    const digit = e.target.value.replace(/\D/g, "").slice(-1);

    const updatedOtp = [...otp];
    updatedOtp[index] = digit;

    onChange(updatedOtp.join(""));

    if (digit && index < OTP_LENGTH - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();

    const pasted = e.clipboardData
      .getData("text")
      .replace(/\D/g, "")
      .slice(0, OTP_LENGTH);

    const updated = Array.from(
      { length: OTP_LENGTH },
      (_, index) => pasted[index] || ""
    );

    onChange(updated.join(""));

    inputRefs.current[Math.min(pasted.length, OTP_LENGTH) - 1]?.focus();
  };

  return (
    <div className="otp-input">
      <div className="otp-input__boxes" onPaste={handlePaste}>
        {otp.map((digit, index) => (
          <input
            key={index}
            ref={(el) => (inputRefs.current[index] = el)}
            type="text"
            inputMode="numeric"
            maxLength={1}
            value={digit}
            onChange={(e) => handleChange(index, e)}
            onKeyDown={(e) => handleKeyDown(index, e)}
          />
        ))}
      </div>
    </div>
  );
};

export default OTPInput;

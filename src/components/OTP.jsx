import { useEffect, useRef, useState } from "react";

const OTP = ({ size = 4 }) => {
  const empty = new Array(size).fill("");
  const [otp, setOtp] = useState(empty);
  const ref = useRef([]);

  useEffect(() => {
    if (otp.every((el) => Number(el))) ref.current[size - 1].focus();
    if (otp.every((el) => el === "")) ref.current[0].focus();
  }, [otp]);

  const handleOnChange = (e, i) => {
    if (!Number(e.target.value)) return;
    updateOTP(e.target.value, i);
    if (i > otp.length - 2) return;
    ref.current[i + 1].focus();
  };

  const handleKeyDowm = (e, i) => {
    if (e.keyCode !== 8) return;
    updateOTP("", i);
    if (i < 1) return;
    ref.current[i - 1].focus();
  };

  const handlePaste = (e, i) => {
    e.preventDefault()
    const text = e.clipboardData.getData("text");
    console.log(
      text.length,
      otp.length,
      size,
      !Number(text),
      text.length !== otp.length
    );
    if (Number(text) && text.length === otp.length)
      setOtp(text.split("").map((el) => Number(el)));
    else setOtp(empty);
  };

  const updateOTP = (char, i) => {
    const newOtp = [...otp];
    newOtp[i] = char;
    setOtp(newOtp);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Entered OTP is ${otp.join("")}`)
  }

  return (
    <div>
      {otp.map((el, i) => {
        return (
          <input
            type="text"
            ref={(el) => (ref.current[i] = el)}
            maxLength={1}
            onChange={(e) => handleOnChange(e, i)}
            value={el}
            key={i}
            onKeyDown={(e) => handleKeyDowm(e, i)}
            onPaste={(e) => handlePaste(e, i)}
          ></input>
        );
      })}
      <button onClick={(e) => handleSubmit(e)}>Submit</button>
    </div>
  );
};

export default OTP;

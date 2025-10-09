import React, { useState } from "react";
import Forgot from "./Forgot.jsx"; // Telegram username + code
import VerifyCode from "./VerifyCode.jsx"; // Optional: agar alohida sahifa kerak bo'lsa

const ForgotFlow = () => {
  const [username, setUsername] = useState("");
  const [step, setStep] = useState(1); // 1 = username, 2 = verify code

  const handleCodeSent = (username) => {
    setUsername(username);
    setStep(2); // verify code inputni ko'rsatish
  };

  return (
    <div>
      {step === 1 && <Forgot onCodeSent={handleCodeSent} />}
      {step === 2 && <VerifyCode username={username} />}
    </div>
  );
};

export default ForgotFlow;

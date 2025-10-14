// ForgotFlow.jsx
import React, { useState } from "react";
import Forgot from "./Forgot";
import VerifyCode from "./VerifyCode";

const ForgotFlow = () => {
  const [username, setUsername] = useState("");
  const [step, setStep] = useState(1);

  const handleCodeSent = (username) => {
    setUsername(username);
    setStep(2);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 p-4">
      {step === 1 && <Forgot onCodeSent={handleCodeSent} />}
      {step === 2 && <VerifyCode username={username} />}
    </div>
  );
};

export default ForgotFlow;

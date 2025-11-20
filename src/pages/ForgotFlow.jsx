import { useState } from "react";
import Forgot from "./Forgot";
import VerifyCode from "./VerifyCode";

const ForgotFlow = () => {
  const [username, setUsername] = useState("");
  const [step, setStep] = useState(1);

  const handleCodeSent = (username) => {
    setUsername(username);
    setStep(2);
  };

  const handleBack = () => setStep(1);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 p-4 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 right-1/3 w-72 h-72 bg-pink-500/5 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      <div className="relative z-10 w-full max-w-md">
        {step === 1 && <Forgot onCodeSent={handleCodeSent} />}
        {step === 2 && <VerifyCode username={username} onBack={handleBack} />}
      </div>
    </div>
  );
};

export default ForgotFlow;

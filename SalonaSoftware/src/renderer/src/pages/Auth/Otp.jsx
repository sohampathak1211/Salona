import React, { useState, useRef, useEffect } from 'react';

function Opt() {
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [timer, setTimer] = useState(30);
  const inputs = useRef([]);

  // Handle OTP input
  const handleChange = (value, index) => {
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Move focus to the next input
    if (value && index < 3) {
      inputs.current[index + 1].focus();
    }
  };

  // Handle backspace
  const handleBackspace = (e, index) => {
    if (e.key === "Backspace" && index > 0 && !otp[index]) {
      inputs.current[index - 1].focus();
    }
  };

  // Resend code timer
  useEffect(() => {
    if (timer > 0) {
      const countdown = setInterval(() => setTimer(timer - 1), 1000);
      return () => clearInterval(countdown);
    }
  }, [timer]);

  // Resend code action
  const handleResend = () => {
    setTimer(30);
    // Add resend code logic here
    alert("OTP resent!");
  };

  return (
    <div className="flex flex-col items-center p-6">
      <h2 className="text-2xl font-bold mb-2">Verify OTP</h2>
      <p className="text-gray-600 text-center mb-6">A code has been sent to your phone number ending in *XXXX*</p>
      
      <div className="flex justify-center gap-2 mb-4">
        {otp.map((_, index) => (
          <input
            key={index}
            type="text"
            maxLength="1"
            value={otp[index]}
            onChange={(e) => handleChange(e.target.value, index)}
            onKeyDown={(e) => handleBackspace(e, index)}
            ref={(el) => (inputs.current[index] = el)}
            className="w-10 h-10 border border-gray-300 rounded-md text-center text-lg focus:outline-none focus:border-pink-400"
          />
        ))}
      </div>

      <div className="mt-4">
        {timer > 0 ? (
          <p className="text-gray-600">Resend code in 00:{timer < 10 ? `0${timer}` : timer} seconds</p>
        ) : (
          <button 
            onClick={handleResend} 
            className="text-pink-500 hover:underline focus:outline-none"
          >
            Resend Code
          </button>
        )}
      </div>
    </div>
  );
}

export default Opt;

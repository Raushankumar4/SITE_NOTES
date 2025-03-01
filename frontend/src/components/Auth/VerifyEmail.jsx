import axios from "axios";
import React, { useRef, useState } from "react";
import { AUTH } from "../../constant";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const VerifyEmail = () => {
  const [fields, setFileds] = useState(Array(6).fill(""));
  const [error, setError] = useState(false);
  const ref = useRef([]);
  const navigate = useNavigate()

  const handleKeyDown = (e, index) => {
    const key = e.key;
    if (key === "ArrowLeft") {
      if (index > 0) ref.current[index - 1].focus();
      return;
    }
    if (key === "ArrowRight" && index + 1 < fields.length) {
      ref.current[index + 1].focus();
      return;
    }
    const copyFileds = [...fields];
    if (key === "Backspace") {
      copyFileds[index] = "";
      setFileds(copyFileds);
      if (index > 0) ref.current[index - 1].focus();
      return;
    }
    if (isNaN(key)) return;
    copyFileds[index] = key;
    if (index + 1 < fields.length) ref.current[index + 1].focus();
    setFileds(copyFileds);
  };
  const handleChange = (e, index) => {
    const { value } = e.target;
    const copyFileds = [...fields];
    copyFileds[index] = value;
  };


  const handleVerifyEmail = async (e) => {
    e.preventDefault();
    if (fields.some((field) => field === "")) {
      setError(true);
    } else {
      setError(false);

    }
    try {
      const { data } = await axios.post(`${AUTH}/verify-email`, fields.join(""));
      toast.success(data?.message);
      navigate("/signIn");
    } catch (error) {
      toast.error(error?.response?.data?.message || error?.message);
    }
  }


  return (
    <div className="w-screen min-h-screen flex flex-col justify-center items-center bg-gradient-to-r from-blue-500 to-indigo-600 p-4">
      <div className="bg-white/20 backdrop-blur-lg shadow-2xl rounded-2xl p-6 md:p-8 max-w-md w-full">
        {/* Error Message */}
        {error && (
          <p className="text-red-500 text-sm text-center mt-2">
            Please fill all the fields.
          </p>
        )}
        <h2 className="text-white text-2xl md:text-3xl font-bold text-center">
          Verify Your Email
        </h2>
        <p className="text-white/80 text-center mt-2">
          Enter the 6-digit code sent to your email.
        </p>

        {/* OTP Input Fields */}
        <form onSubmit={handleVerifyEmail}>
          <div className="flex justify-center gap-3 mt-6">
            {fields.map((value, index) => (
              <input
                key={index}
                onChange={handleChange}
                maxLength={1}
                value={value}
                ref={(currentInput) => (ref.current[index] = currentInput)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                type="text"
                className="w-12 h-12 md:w-14 md:h-14 text-center text-2xl border-2 border-white/50 bg-transparent rounded-md text-white focus:outline-none focus:border-white transition-all"
              />
            ))}
          </div>


          {/* Verify Button */}
          <button className="w-full mt-6 bg-white text-blue-600 font-semibold py-3 rounded-lg shadow-md hover:bg-gray-200 transition">
            Verify
          </button>
        </form>
        {/* Resend Code */}
        <p className="text-center text-white/80 mt-4">
          Didn't receive the code?{" "}
          <button className="text-white font-semibold hover:underline">
            Resend
          </button>
        </p>
      </div>
    </div>
  );
};

export default VerifyEmail;

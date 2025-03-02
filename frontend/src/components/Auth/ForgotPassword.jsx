import React from "react";
import { InputArea } from "../InputField/InputArea";
import { useForgotPassword } from "../../hooks/useForgotPassword";

const ForgotPassword = () => {
  const { userInput, error, loading, handleOnChange, handleOnForgot } =
    useForgotPassword();
  return (
    <div className="flex items-center justify-center min-h-screen w-screen p-6 body">
      <div className="glass-card w-full max-w-md p-8 rounded-2xl shadow-xl backdrop-blur-md">
        <div className="flex justify-center mb-6">
          <img src="forgot.png" alt="logo" className="w-24 h-24 object-contain" />
        </div>
        <div className="text-center">
          <h5 className="text-white text-2xl font-bold mb-2">Forgot Password?</h5>
          <p className="text-100 text-sm mb-6">
            No worries! Enter your email below and we'll send you a reset link.
          </p>
        </div>
        <div>
          <form onSubmit={handleOnForgot} className="space-y-5">
            <InputArea
              label="Email Address"
              name="email"
              type="email"
              placeholder="Enter your email"
              id="email"
              onChange={handleOnChange}
              value={userInput.email}
              error={error.email}
              disabled={loading}
            />
            <div className="flex justify-center">
              <button
                type="submit"
                className="w-full max-w-sm bg-gradient-to-r from-blue-400 to-blue-900 hover:from-blue-500 hover:to-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 ease-in-out transform hover:scale-105 disabled:opacity-50"
                disabled={loading}
              >
                {loading ? "Processing..." : "Send Reset Link"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
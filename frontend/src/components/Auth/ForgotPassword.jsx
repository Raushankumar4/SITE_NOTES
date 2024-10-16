import React from "react";
import { InputArea } from "../InputField/InputArea";
import { useForgotPassword } from "../../hooks/useForgotPassword";

const ForgotPassword = () => {
  const { userInput, error, loading, handleOnChange, handleOnForgot } =
    useForgotPassword();
  return (
    <div className="relative">
      <div className="mt-12 w-2/3 mx-auto bg-[#ffff] shadow-lg rounded-lg">
        <div className="w-56 h-48 mx-auto my-10  ">
          <img src="forgot.png" alt="logo" />
        </div>
        <div>
          <h5 className="text-center mb-6">Forgot your Password?</h5>
          <p className="text-center mb-6 text-gray-400">
            Enter your email address and we'll send you a link to reset your
            password.
          </p>
        </div>
        <div className="p-4 ">
          <form onSubmit={handleOnForgot}>
            <InputArea
              label="Email"
              name="email"
              type="email"
              placeholder="Enter your email"
              id="email"
              onChange={handleOnChange}
              value={userInput.email}
              error={error.email}
              disabled={loading}
           
            />
            <div className="grid place-items-center">
            
              <button
                type="submit"
                className="w-1/4 text-center hover:transition-all hover:duration-500 hover:scale-105 hover:ease-in-out bg-[#FFC727]  text-white hover:bg-gray-600 py-2 rounded-lg mt-4 "
                disabled={loading}
              >
                {loading ? "Loading..." : "Submit"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;

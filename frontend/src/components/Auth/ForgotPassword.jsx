import React from "react";
import { InputArea } from "../InputField/InputArea";
import { useForgotPassword } from "../../hooks/useForgotPassword";

const ForgotPassword = () => {
  const { userInput, error, loading, handleOnChange, handleOnForgot } =
    useForgotPassword();
  return (
    <div>
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
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          disabled={loading}
        >
          Send Email
        </button>
      </form>
    </div>
  );
};

export default ForgotPassword;

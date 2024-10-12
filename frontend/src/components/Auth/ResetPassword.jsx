import React from "react";
import { InputArea } from "../InputField/InputArea";
import { useResetPassword } from "../../hooks/useResetPassword";
import { useParams } from "react-router-dom";

const ResetPassword = () => {
  const { token } = useParams();
  const { userInput, error, loading, handleOnChange, handleResetPassword } =
    useResetPassword(token);

  return (
    <div>
      ResetPassword
      <form onSubmit={handleResetPassword}>
        <InputArea
          name="password"
          type="password"
          placeholder="Enter new password"
          id="newPassword"
          onChange={handleOnChange}
          value={userInput?.password}
          error={error?.password}
          disabled={loading}
        />
        <InputArea
          name="confirmPassword"
          type="password"
          placeholder="Enter confirm password"
          id="confirmPassword"
          onChange={handleOnChange}
          value={userInput?.confirmPassword}
          error={error?.confirmPassword}
          disabled={loading}
        />
        <button
          type="submit"
          disabled={loading}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default ResetPassword;

import React, { useState } from "react";
import { InputArea } from "../InputField/InputArea";
import { useChangePassword } from "../../hooks/useChangePassword";
import { useSelector } from "react-redux";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai"; 
const ChangePassword = () => {
  const userId = useSelector((state) => state.user.user?._id);
  console.log(userId);

  const { userInput, handleOnChange, hanldeUpdatePassword,error } =
    useChangePassword();


  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);

  const toggleCurrentPassword = () => setShowCurrentPassword(!showCurrentPassword);
  const toggleNewPassword = () => setShowNewPassword(!showNewPassword);

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 px-4">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full sm:w-96 md:w-1/2 lg:w-1/3 xl:w-1/4">
        <h1 className="text-2xl font-semibold text-center text-gray-800 mb-6">
          Change Password
        </h1>
        <form onSubmit={hanldeUpdatePassword}>
          <div className="mb-4 relative">
            <InputArea
              name="currentPassword"
              value={userInput.currentPassword}
              placeholder="Current password"
              label="Current Password"
              onChange={handleOnChange}
              error={error.currentPassword}
              type={showCurrentPassword ? "text" : "password"} // Toggle password type
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="button"
              onClick={toggleCurrentPassword}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500"
            >
              {showCurrentPassword ? (
                <AiFillEye size={20} />
              ) : (
                <AiFillEyeInvisible size={20} />
              )}
            </button>
          </div>
          <div className="mb-6 relative">
            <InputArea
              name="newPassword"
              label="New Password"
              value={userInput.newPassword}
              placeholder="New password"
              onChange={handleOnChange}
              error={error.newPassword}
              type={showNewPassword ? "text" : "password"}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="button"
              onClick={toggleNewPassword}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500"
            >
              {showNewPassword ? (
                <AiFillEye size={20} />
              ) : (
              <AiFillEyeInvisible size={20} />
              )}
            </button>
          </div>
          <div className="flex justify-center">
            <button
              type="submit"
              className="w-full py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Change
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ChangePassword;

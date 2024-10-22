import React, { useState } from "react";
import { useRegisterUser } from "../../hooks/useRegisterUser";
import { InputArea } from "../InputField/InputArea";
import SelectOption from "../InputField/SelectOption";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  FaUser,
  FaEnvelope,
  FaLock,
  FaPhone,
  FaEye,
  FaEyeSlash,
} from "react-icons/fa";

const SignUp = () => {
  const { handleOnChange, userInput, handleOnRegister, error, loading } =
    useRegisterUser();

  const selectRole = [
    { value: "student", label: "Student" },
    { value: "teacher", label: "Teacher" },
  ];

  const [showPassword, setShowPassword] = useState(false);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  const selectCourseBranch = [
    { value: "CSE", label: "CSE" },
    { value: "ECE", label: "ECE" },
    { value: "EEE", label: "EEE" },
    { value: "MECH", label: "MECH" },
    { value: "CIVIL", label: "CIVIL" },
    { value: "IT", label: "IT" },
    { value: "EIE", label: "EIE" },
    { value: "CHEMICAL", label: "Chemical" },
    { value: "BIOTECH", label: "Biotech" },
    { value: "OTHERS", label: "Others" },
  ];

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-xl">
        <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>
        <form onSubmit={handleOnRegister}>
          <div className="grid grid-cols-1 gap-4 mb-4 md:grid-cols-2">
            <div>
              <InputArea
                name="fullName"
                type="text"
                placeholder="Enter your name"
                value={userInput.fullName}
                onChange={handleOnChange}
                error={error?.fullName}
                icon={<FaUser />}
              />
            </div>
            <div>
              <InputArea
                name="email"
                type="email"
                placeholder="Enter your email"
                value={userInput.email}
                onChange={handleOnChange}
                error={error?.email}
                icon={<FaEnvelope />}
              />
            </div>
          </div>
          <div className="grid grid-cols-1 gap-4 mb-4 md:grid-cols-2">
            <div className="relative">
              <InputArea
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                value={userInput.password}
                onChange={handleOnChange}
                error={error?.password}
                className="flex-grow"
                icon={<FaLock />}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-11 right-0 flex items-center pr-3 text-gray-500 hover:text-blue-500 focus:outline-none"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
            <div>
              <InputArea
                name="phoneNumber"
                type="number"
                placeholder="Enter phone number"
                value={userInput.phoneNumber}
                onChange={handleOnChange}
                error={error?.phoneNumber}
                icon={<FaPhone />}
              />
            </div>
          </div>
          <div className="grid grid-cols-1 gap-4 mb-4 md:grid-cols-2">
            <div>
              <SelectOption
                id="selectBranch"
                name="selectBranch"
                label="Select Branch"
                value={userInput.selectBranch}
                onChange={handleOnChange}
                error={error?.selectBranch}
                options={selectCourseBranch}
              />
            </div>
            <div>
              <SelectOption
                id="role"
                name="role"
                label="Role"
                value={userInput.role}
                onChange={handleOnChange}
                error={error?.role}
                options={selectRole}
                className="w-fit"
              />
            </div>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white font-bold py-2 rounded hover:bg-blue-600 transition duration-200"
          >
            Register
          </button>
        </form>
        <div className="mt-4 text-center">
          <p className="text-gray-600">
            Already have an account?{" "}
            <Link to="signIn" className="text-blue-500 hover:underline">
              Log in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;

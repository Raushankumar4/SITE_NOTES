import React, { useState } from "react";
import { useRegisterUser } from "../../hooks/useRegisterUser";
import { InputArea } from "../InputField/InputArea";
import SelectOption from "../InputField/SelectOption";
import { Link } from "react-router-dom";

const SignUp = () => {
  const { handleOnChange, userInput, handleOnRegister, error, loading } =
    useRegisterUser();

  const selectRole = [
    { value: "student", label: "Student" },
    { value: "teacher", label: "Teacher" },
  ];
  const [showPassword, setShowPassword] = useState(false);

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
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Sign Up</h2>
        <form onSubmit={handleOnRegister}>
          <InputArea
            name="fullName"
            type="text"
            label="Full Name"
            placeholder="Enter your name"
            value={userInput.fullName}
            onChange={handleOnChange}
            error={error?.fullName}
          />
          <InputArea
            name="email"
            type="email"
            label="Email"
            placeholder="Enter your email"
            value={userInput.email}
            onChange={handleOnChange}
            error={error?.email}
          />
          <InputArea
            name="password"
            type={showPassword ? "text" : "password"}
            label="Password"
            placeholder="Enter your password"
            value={userInput.password}
            onChange={handleOnChange}
            error={error?.password}
            className="mb-4 "
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="text-blue-500 hover:underline mb-4"
          >
            {showPassword ? "Hide" : "Show"}
          </button>
          <InputArea
            name="phoneNumber"
            type="number"
            label="Phone Number"
            placeholder="Enter your phone number"
            value={userInput.phoneNumber}
            onChange={handleOnChange}
            error={error?.phoneNumber}
          />
          <SelectOption
            id="role"
            name="role"
            label="Role"
            value={userInput.role}
            onChange={handleOnChange}
            error={error?.role}
            options={selectRole}
          />
          <SelectOption
            id="selectBranch"
            name="selectBranch"
            label="Select Branch"
            value={userInput.selectBranch}
            onChange={handleOnChange}
            error={error?.selectBranch}
            options={selectCourseBranch}
          />
          <button
            type="submit"
            disabled={loading}
            className={`mt-4 w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition duration-200 ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            Sign Up
          </button>
        </form>
        <div className="mt-4 text-center">
          <p className="text-gray-600">
            Already have an account?{" "}
            <Link to="/signIn" className="text-blue-500 hover:underline">
              Log In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;

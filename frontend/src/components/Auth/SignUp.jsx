import React, { useState } from "react";
import { useRegisterUser } from "../../hooks/useRegisterUser";
import { InputArea } from "../InputField/InputArea";
import SelectOption from "../InputField/SelectOption";
import { Link, useNavigate } from "react-router-dom";
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

  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  const selectRole = [
    { value: "student", label: "Student" },
    { value: "teacher", label: "Teacher" },
  ];

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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 to-indigo-600 p-6">
      <div className="bg-white/20 backdrop-blur-lg shadow-2xl rounded-2xl overflow-hidden flex flex-col md:flex-row w-full max-w-5xl">
        {/* Left Side - Form */}
        <div className="w-full md:w-1/2 p-6 md:p-8">
          <h2 className="text-2xl md:text-3xl font-extrabold text-white text-center mb-4 md:mb-6">
            Create an Account
          </h2>
          <form onSubmit={handleOnRegister} className="space-y-4 md:space-y-5">
            {/* Full Name & Email */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <InputArea
                name="fullName"
                type="text"
                placeholder="Full Name"
                value={userInput.fullName}
                onChange={handleOnChange}
                error={error?.fullName}
                icon={<FaUser />}
              />
              <InputArea
                name="email"
                type="email"
                placeholder="Email Address"
                value={userInput.email}
                onChange={handleOnChange}
                error={error?.email}
                icon={<FaEnvelope />}
              />
            </div>

            {/* Password & Phone Number */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="relative">
                <InputArea
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  value={userInput.password}
                  onChange={handleOnChange}
                  error={error?.password}
                  className="flex-grow"
                  icon={<FaLock />}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-10 right-3 text-gray-500 hover:text-blue-300"
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
              <InputArea
                name="phoneNumber"
                type="number"
                placeholder="Phone Number"
                value={userInput.phoneNumber}
                onChange={handleOnChange}
                error={error?.phoneNumber}
                icon={<FaPhone />}
              />
            </div>

            {/* Select Branch & Role */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <SelectOption
                id="selectBranch"
                name="selectBranch"
                label="Select Branch"
                value={userInput.selectBranch}
                onChange={handleOnChange}
                error={error?.selectBranch}
                options={selectCourseBranch}
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
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full create text-white font-bold py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
            >
              {loading ? "Signing Up..." : "Sign Up"}
            </button>
          </form>

          {/* Login Redirect */}
          <div className="mt-4 md:mt-6 text-center">
            <p className="text-white text-sm md:text-base">
              Already have an account?{" "}
              <button onClick={() => navigate(-1)} className="text-blue-300 font-semibold hover:underline">
                Log in
              </button>
            </p>
          </div>
        </div>

        {/* Right Side - Image with Overlay */}
        <div className="hidden md:flex md:w-1/2 relative">
          <img
            src="signup.svg"
            alt="Sign Up"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
            <h2 className="text-white text-3xl font-semibold text-center p-6">
              Welcome to Our Community!
            </h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;

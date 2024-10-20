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
    <>
      {!isAuthenticated && (
        <div className="flex justify-center items-center">
          <div className="backdrop-blur-sm backdrop-filter rounded-3xl shadow-lg  mt-10  p-8 w-full max-w-xl mx-4">
            <h2 className="text-3xl font-bold mb-6 text-center dark:text-[#0F3BFE]">
              Sign Up
            </h2>
            <form onSubmit={handleOnRegister}>
              <div className="flex space-x-4 items-center  md:justify-around mt-4">
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

              <div className="flex mt-4 space-x-4 md:justify-around relative">
                <div>
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
                    className="absolute bottom-3 left-[40%] text-blue-500"
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
                <div>
                  <InputArea
                    name="phoneNumber"
                    type="number"
                    placeholder="Enter your phone number"
                    value={userInput.phoneNumber}
                    onChange={handleOnChange}
                    error={error?.phoneNumber}
                    icon={<FaPhone />}
                  />
                </div>
              </div>
              <div className="flex space-x-4 items-center md:justify-around mt-5">
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
              </div>
              <button
                type="submit"
                disabled={loading}
                className={`mt-4 w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-xl transition duration-200 ${
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
      )}
    </>
  );
};

export default SignUp;

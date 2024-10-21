import React, { useState } from "react";
import { InputArea } from "../InputField/InputArea";
import { useLoginUser } from "../../hooks/useLoginUser";
import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { FaRegEyeSlash, FaRegUser } from "react-icons/fa";
import { RiLockPasswordLine } from "react-icons/ri";
import { LuEye } from "react-icons/lu";
import LoadingSpinner from "../Loading/LoadingSpinner";

const SignInPage = () => {
  const { userInput, error, handleOnChange, handleOnLogin, loading } =
    useLoginUser();
  const location = useLocation();
  const show = location.pathname === "/signIn";
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const [showPassword, setShowPassword] = useState(false);

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <>
      {!isAuthenticated && (
        <div className="flex items-center justify-center md:h-[88vh] h-[91.4vh] mx-4">
          <div className="backdrop-blur-sm backdrop-filter rounded-3xl shadow-lg p-8    w-full max-w-4xl flex flex-col md:flex-row">
            <div className="md:w-1/2 hidden md:block">
              <img
                src="https://static.vecteezy.com/system/resources/previews/012/421/877/non_2x/3d-multitasking-man-free-png.png"
                alt="Login"
                className="object-cover w-full h-full rounded-l-lg"
              />
            </div>
            <div className="w-full  p-4 md:mt-10 md:w-1/2">
              <h2 className="text-2xl font-bold mb-6 text-center">
                {show ? "Student Login" : "Teacher Login"}
              </h2>

              <form onSubmit={handleOnLogin}>
                <InputArea
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  id="email"
                  onChange={handleOnChange}
                  value={userInput.email}
                  error={error.email}
                  icon={<FaRegUser />}
                  autoComplete="email"
                />
                <div className="relative mt-4">
                  <InputArea
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="Enter your password"
                    id="password"
                    onChange={handleOnChange}
                    value={userInput.password}
                    error={error.password}
                    icon={<RiLockPasswordLine />}
                    autoComplete="password"
                  />
                  <span
                    onClick={handleShowPassword}
                    className="absolute right-3 top-3 cursor-pointer"
                  >
                    {showPassword ? <LuEye /> : <FaRegEyeSlash />}
                  </span>
                </div>

                <div className="flex justify-between items-center mt-4">
                  <div>
                    <input
                      type="checkbox"
                      id="rememberMe"
                      className="mr-2 leading-tight"
                    />
                    <label
                      htmlFor="rememberMe"
                      className="text-sm text-gray-700"
                    >
                      Remember Me
                    </label>
                  </div>
                  <div className="flex justify-end">
                    <Link
                      to="/forgotPassword"
                      className="text-blue-500 no-underline hover:underline text-sm"
                    >
                      Forgot Password?
                    </Link>
                  </div>
                </div>

                <button
                  disabled={loading}
                  type="submit"
                  className="mt-4 w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-xl transition duration-200"
                >
                  {loading ? (
                    <LoadingSpinner className="inline-block" />
                  ) : (
                    "Login"
                  )}
                </button>
              </form>

              <div className="flex flex-col items-center mt-4">
                <p className="mt-2 text-gray-600 text-sm">
                  Don't have an account?
                  <Link
                    to="/signUp"
                    className="text-blue-500 mx-1 hover:underline no-underline"
                  >
                    Create an account
                  </Link>
                </p>
                {show ? (
                  <p className="mt-2 text-gray-600 text-sm">
                    <Link
                      to="/teacherLogin"
                      className="text-blue-500 text-md no-underline hover:underline"
                    >
                      Login as Teacher
                    </Link>
                  </p>
                ) : (
                  <p className="mt-2 text-gray-600 text-sm">
                    <Link
                      to="/signIn"
                      className="text-blue-500 hover:underline"
                    >
                      Login as Student
                    </Link>
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SignInPage;

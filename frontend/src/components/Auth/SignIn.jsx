import React from "react";
import { InputArea } from "../InputField/InputArea";
import { useLoginUser } from "../../hooks/useLoginUser";
import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { FaRegUser } from "react-icons/fa";
import { RiLockPasswordLine } from "react-icons/ri";

const SignInPage = () => {
  const { userInput, error, handleOnChange, handleOnLogin, loading } =
    useLoginUser();
  const location = useLocation();
  const show = location.pathname === "/signIn";
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  return (
    <>
      {!isAuthenticated && (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
          <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-4xl flex flex-col md:flex-row">
            <div className="md:w-1/2 hidden md:block">
              <img
                src="https://static.vecteezy.com/system/resources/previews/012/421/877/non_2x/3d-multitasking-man-free-png.png"
                alt="Login"
                className="object-cover w-full h-full rounded-l-lg"
              />
            </div>
            <div className="w-full p-4 md:w-1/2">
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
                <InputArea
                  type="password"
                  name="password"
                  placeholder="Enter your password"
                  id="password"
                  onChange={handleOnChange}
                  value={userInput.password}
                  error={error.password}
                  icon={<RiLockPasswordLine />}
                  autoComplete="password"
                />

                {/* Remember Me Checkbox */}
                <div className="flex justify-between items-center mt-4">
                  <div>
                    <input
                      type="checkbox"
                      id="rememberMe"
                      name="rememberMe"
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
                  className="mt-4 w-full  bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition duration-200"
                >
                  Sign In
                </button>
              </form>

              <div className="flex flex-col items-center mt-4">
                <p className="mt-2 text-gray-600 text-sm ">
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

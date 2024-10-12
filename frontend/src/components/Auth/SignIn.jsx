import React from "react";
import { InputArea } from "../InputField/InputArea";
import { useLoginUser } from "../../hooks/useLoginUser";
import { Link, useLocation } from "react-router-dom";

const SignInPage = () => {
  const { userInput, error, handleOnChange, handleOnLogin, loading } =
    useLoginUser();
  const location = useLocation();
  const show = location.pathname === "/signIn";
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-xs">
        <h2 className="text-2xl font-bold mb-6 text-center">
          {show ? "Student Login" : "Teacher Login"}
        </h2>
        <form onSubmit={handleOnLogin}>
          <InputArea
            label="Email"
            type="email"
            name="email"
            placeholder="Enter your email"
            id="email"
            onChange={handleOnChange}
            value={userInput.email}
            error={error.email}
          />
          <InputArea
            label="Password"
            type="password"
            name="password"
            placeholder="Enter your password"
            id="password"
            onChange={handleOnChange}
            value={userInput.password}
            error={error.password}
          />
          <button
            disabled={loading}
            type="submit"
            className="mt-4 w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition duration-200"
          >
            Sign In
          </button>
        </form>

        <div className="flex flex-col items-center mt-4">
          <Link
            to="/forgotPassword"
            className="text-blue-500 hover:underline text-sm"
          >
            Forgot Password?
          </Link>
          <p className="mt-2 text-gray-600 text-sm">
            I have no account.{" "}
            <Link to="/signUp" className="text-blue-500 hover:underline">
              Sign Up
            </Link>
          </p>
          {show ? (
            <p className="mt-2 text-gray-600 text-sm">
              <Link
                to="/teacherLogin"
                className="text-blue-500 hover:underline"
              >
                Login as Teacher
              </Link>
            </p>
          ) : (
            <p className="mt-2 text-gray-600 text-sm">
              <Link to="/signIn" className="text-blue-500 hover:underline">
                Login as Student
              </Link>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default SignInPage;

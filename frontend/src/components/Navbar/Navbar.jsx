import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logOutUser } from "../Auth/logOut";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { isAuthenticated, token } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleLogOut = () => {
    logOutUser(dispatch, navigate, token);
  };

  return (
    <nav className="bg-gray-700 text-black flex justify-between items-center p-4 fixed top-0 left-0 w-full z-50 shadow-md">
      <div className="text-2xl font-bold">Share Notes</div>
      {/* Desktop Links */}
      <div className="hidden md:flex gap-8 text-lg px-10">
        <Link
          className="transition duration-200 hover:text-gray-300 no-underline"
          to="/"
        >
          Home
        </Link>
        {!isAuthenticated ? (
          <>
            <Link
              className="transition duration-200 hover:text-gray-300 no-underline"
              to="/signUp"
            >
              Sign Up
            </Link>
            <Link
              className="transition duration-200 hover:text-gray-300 no-underline"
              to="/signIn"
            >
              Sign In
            </Link>
          </>
        ) : (
          <button
            onClick={() => {
              handleLogOut();
              toggleMenu();
            }}
            className="transition duration-200 hover:text-gray-300 no-underline"
          >
            Log Out
          </button>
        )}
      </div>

      {/* Hamburger Menu for mobile */}
      <div className="md:hidden">
        <button onClick={toggleMenu} className="focus:outline-none text-2xl">
          &#9776;
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="absolute top-16 left-0 w-full bg-gray-700 text-white py-4 flex flex-col items-center md:hidden">
          <Link
            className="py-2 transition duration-200 hover:text-gray-300 no-underline"
            to="/"
            onClick={toggleMenu}
          >
            Home
          </Link>
          {!isAuthenticated ? (
            <>
              <Link
                className="py-2 transition duration-200 hover:text-gray-300 no-underline"
                to="/signUp"
                onClick={toggleMenu}
              >
                Sign Up
              </Link>
              <Link
                className="py-2 transition duration-200 hover:text-gray-300 no-underline"
                to="/signIn"
                onClick={toggleMenu}
              >
                Sign In
              </Link>
            </>
          ) : (
            <button
              className="py-2 transition duration-200 hover:text-gray-300 no-underline"
              onClick={() => {
                handleLogOut();
                toggleMenu();
              }}
            >
              Log Out
            </button>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;

import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logOutUser } from "../Auth/logOut";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { isAuthenticated, token } = useSelector((state) => state.auth);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleLogOut = () => {
    logOutUser(dispatch, navigate, token);
  };

  return (
    <nav className=" bg-gray-100 flex justify-between items-center p-4">
      <div className="text-2xl font-bold">Share Notes</div>
      {/* Desktop Links */}
      <div className="hidden md:flex gap-8 text-lg px-10">
        <Link className=" transition duration-200 no-underline" to="/">
          Home
        </Link>
        {!isAuthenticated && (
          <>
            <Link
              className=" transition duration-200 no-underline"
              to="/signUp"
            >
              Sign Up
            </Link>
            <Link
              className=" transition duration-200 no-underline"
              to="/signIn"
            >
              Sign In
            </Link>
          </>
        )}
        {isAuthenticated && (
          <button
            onClick={() => {
              handleLogOut();
              toggleMenu();
            }}
            className=" transition duration-200 no-underline"
            to="/signIn"
          >
            LogOut
          </button>
        )}
      </div>

      {/* Hamburger Menu for mobile */}
      <div className="md:hidden">
        <button onClick={toggleMenu} className="focus:outline-none">
          &#9776;
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="absolute top-16 left-0 w-full bg-gray-200 text-black py-4 px-4 flex flex-col items-center md:hidden">
          <Link
            className="py-2  transition duration-200 no-underline"
            to="/"
            onClick={toggleMenu}
          >
            Home
          </Link>
          <Link
            className="py-2  transition duration-200 no-underline"
            to="/signUp"
            onClick={toggleMenu}
          >
            Sign Up
          </Link>

          <Link
            className="py-2  transition duration-200 no-underline"
            to="/signIn"
            onClick={toggleMenu}
          >
            Sign In
          </Link>
          <button
            className="py-2  transition duration-200 no-underline"
            onClick={() => {
              handleLogOut();
              toggleMenu();
            }}
          >
            Logou
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;

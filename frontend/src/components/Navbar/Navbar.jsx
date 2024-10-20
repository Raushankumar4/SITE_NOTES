import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import Theme from "../Theme/Theme";
import { useDispatch, useSelector } from "react-redux";
import { logOutUser } from "../Auth/logOut";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const [searchQuery, setSearchQuery] = useState("");
  const [filteredPapers, setFilteredPapers] = useState([]);

  const { semesterPapers, sessionalPapers } = useSelector(
    (state) => state.user
  );

  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  useEffect(() => {
    if (searchQuery) {
      const filteredSemesterPapers =
        semesterPapers?.filter((paper) =>
          paper?.title?.toLowerCase().includes(searchQuery.toLowerCase())
        ) || [];

      const filteredSessionalPapers =
        sessionalPapers?.filter((paper) =>
          paper?.title?.toLowerCase().includes(searchQuery.toLowerCase())
        ) || [];

      setFilteredPapers([
        ...filteredSemesterPapers,
        ...filteredSessionalPapers,
      ]);
    } else {
      setFilteredPapers([]);
    }
  }, [searchQuery, semesterPapers, sessionalPapers]);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = useSelector((state) => state.auth.token);

  const handleLogout = () => {
    logOutUser(dispatch, navigate, token);
  };

  return (
    <nav className="backdrop-blur-sm backdrop-filter shadow-gray-600 shadow-lg dark:text-[#FFFFFF] dark:bg-[#363636] text-[#000000] flex items-center justify-between p-3 sticky top-0 z-50">
      <div className="text-lg font-bold hidden md:block">
        <img
          className="w-10 pb-2 inline-block"
          src="https://file.aiquickdraw.com/imgcompressed/img/compressed_3b79d0bb6d25f81a6dde0e450a5e33aa.webp"
          alt=""
        />
        <Link
          to="/"
          className="ml-2 text-xl dark:text-[#FFFFFF] dark:bg-[#363636] text-[#000000] no-underline "
        >
          SITE
        </Link>
      </div>

      {/* Hamburger Menu */}
      <div className="md:hidden" onClick={toggleMenu}>
        <div
          className={`h-1 w-6 dark:bg-[#FFFFFF] bg-[#000000] mb-1 transition-all ${
            isOpen ? "rotate-45 translate-y-1.5" : ""
          }`}
        />
        <div
          className={`h-1 w-6 dark:bg-[#FFFFFF] bg-[#000000] mb-1 transition-all ${
            isOpen ? "opacity-0" : ""
          }`}
        />
        <div
          className={`h-1 w-6 dark:bg-[#FFFFFF] bg-[#000000] transition-all ${
            isOpen ? "-rotate-45 -translate-y-1.5" : ""
          }`}
        />
      </div>

      {/* Search Bar */}
      <div className="flex-grow mx-4 relative">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search..."
          className="md:w-1/2 p-3 dark:text-[#FFFFFF] dark:bg-[#3d3c3c] outline-none focus:ring-1 focus:ring-gray-700 rounded-full placeholder-gray-400"
        />

        <div className="mx-4 absolute top-15">
          {searchQuery && filteredPapers?.length > 0 ? (
            <div className="grid">
              {filteredPapers?.map((paper) => (
                <div
                  key={paper?._id}
                  className="w-1/3 p-3 dark:text-[#FFFFFF] outline-none focus:ring-1 focus:ring-gray-700 placeholder-gray-400"
                >
                  <Link
                    className="no-underline dark:text-[#eeeef2]"
                    to={`/semesterPaper/sessionalPapers/${paper?._id}`}
                  >
                    {paper?.title}
                  </Link>
                </div>
              ))}
            </div>
          ) : (
            searchQuery && (
              <div className="p-3 text-center text-gray-500 dark:text-gray-300">
                Not Found
              </div>
            )
          )}
        </div>
      </div>

      {/* Sign In / Sign Up */}
      <div className="hidden md:flex ">
        <Theme />
        {!isAuthenticated ? (
          <>
            <button
              onClick={() => navigate("/signIn")}
              className="text-[#030303] no-underline text-lg  px-4 py-[10px] rounded-full dark:text-[#FFFFFF] dark:bg-[#363636]"
            >
              Log in
            </button>
            <button
              onClick={() => navigate("/signUp")}
              className="bg-[#000000] no-underline dark:text-[#FFFFFF] dark:bg-[#0F3BFE]  text-[#ffff] hover:bg-blue-600 px-4 py-[10px] rounded-full"
            >
              Sign Up
            </button>
          </>
        ) : (
          <>
            <Link
              to="/"
              className="text-[#030303] no-underline text-lg  px-4 py-[10px] rounded-full dark:text-[#FFFFFF] dark:bg-[#363636]"
            >
              Home
            </Link>
            <Link
              to="/profile"
              className="text-[#030303] no-underline text-lg  px-4 py-[10px] rounded-full dark:text-[#FFFFFF] dark:bg-[#363636]"
            >
              Profile
            </Link>
            <Link
              to="/semesterPaper"
              className="text-[#030303] no-underline text-lg  px-4 py-[10px] rounded-full dark:text-[#FFFFFF] dark:bg-[#363636]"
            >
              Notes
            </Link>
            <Link
              to="/create"
              className="text-[#030303] no-underline text-lg  px-4 py-[10px] rounded-full dark:text-[#FFFFFF] dark:bg-[#363636]"
            >
              Create
            </Link>

            <button
              onClick={handleLogout}
              className="bg-[#000000] no-underline dark:text-[#FFFFFF] dark:bg-[#0F3BFE]  text-[#ffff] hover:bg-blue-600 px-4 py-[10px] rounded-full"
            >
              Sign Out
            </button>
          </>
        )}
      </div>

      {/* Mobile Menu */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: isOpen ? 1 : 0, y: isOpen ? 0 : -20 }}
        transition={{ duration: 0.2 }}
        className={`absolute top-20 dark:bg-[#363636] flex flex-col space-x-2 left-0 w-full bg-[#E5E5E5] p-4 space-y-2 md:hidden ${
          isOpen ? "block" : "hidden"
        }`}
      >
        {!isAuthenticated ? (
          <>
            <ul className="space-y-4">
              <li>
                <button
                  onClick={() => {
                    navigate("/signIn");
                    toggleMenu();
                  }}
                  className="bg-[#000000] no-underline dark:text-[#FFFFFF] dark:bg-[#0F3BFE]  text-[#ffff] hover:bg-blue-600 px-4 py-[10px] rounded-full"
                >
                  Log in
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    navigate("/signUp");
                    toggleMenu();
                  }}
                  className="bg-[#000000] no-underline dark:text-[#FFFFFF] dark:bg-[#0F3BFE]  text-[#ffff] hover:bg-blue-600 px-4 py-[10px] rounded-full"
                >
                  Sign Up
                </button>
              </li>
            </ul>
          </>
        ) : (
          <>
            <ul className="space-y-4">
              <li className="text-[#030303] no-underline text-lg    dark:text-[#FFFFFF] dark:bg-[#363636]">
                <button
                  onClick={() => {
                    navigate("/");
                    toggleMenu();
                  }}
                  className="bg-[#000000] no-underline dark:text-[#FFFFFF] dark:bg-[#0F3BFE]  text-[#ffff] hover:bg-blue-600 px-4 py-[10px] rounded-full"
                >
                  Home
                </button>
              </li>
              <li className="text-[#030303] no-underline text-lg    dark:text-[#FFFFFF] dark:bg-[#363636]">
                <button
                  onClick={() => {
                    navigate("/profile");
                    toggleMenu();
                  }}
                  className="bg-[#000000] no-underline dark:text-[#FFFFFF] dark:bg-[#0F3BFE]  text-[#ffff] hover:bg-blue-600 px-4 py-[10px] rounded-full"
                >
                  Profile
                </button>
              </li>
              <li className="text-[#030303] no-underline text-lg    dark:text-[#FFFFFF] dark:bg-[#363636]">
                <button
                  onClick={() => {
                    navigate("semesterPaper");
                    toggleMenu();
                  }}
                  className="bg-[#000000] no-underline dark:text-[#FFFFFF] dark:bg-[#0F3BFE]  text-[#ffff] hover:bg-blue-600 px-4 py-[10px] rounded-full"
                >
                  Notes
                </button>
              </li>
              <li className="text-[#030303] no-underline text-lg    dark:text-[#FFFFFF] dark:bg-[#363636]">
                <button
                  onClick={() => {
                    navigate("/create");
                    toggleMenu();
                  }}
                  className="bg-[#000000] no-underline dark:text-[#FFFFFF] dark:bg-[#0F3BFE]  text-[#ffff] hover:bg-blue-600 px-4 py-[10px] rounded-full"
                >
                  Create
                </button>
              </li>
              <li className="text-[#030303] no-underline text-lg    dark:text-[#FFFFFF] dark:bg-[#363636]">
                <button
                  onClick={() => {
                    toggleMenu();
                  }}
                  className="bg-[#000000] no-underline dark:text-[#FFFFFF] dark:bg-[#0F3BFE]  text-[#ffff] hover:bg-blue-600 px-4 py-[10px] rounded-full"
                >
                  About
                </button>
              </li>
              <li>
                <button
                  onClick={handleLogout}
                  className="bg-[#000000] no-underline dark:text-[#FFFFFF] dark:bg-[#0F3BFE]  text-[#ffff] hover:bg-blue-600 px-4 py-[10px] rounded-full"
                >
                  Log Out
                </button>
              </li>
            </ul>
          </>
        )}
      </motion.div>
    </nav>
  );
};

export default Navbar;

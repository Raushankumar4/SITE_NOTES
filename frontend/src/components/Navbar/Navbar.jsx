import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Theme from "../Theme/Theme";
import { useSelector } from "react-redux";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const [searchQuery, setSearchQuery] = useState("");
  const [filteredPapers, setFilteredPapers] = useState([]);

  const { semesterPapers, sessionalPapers } = useSelector(
    (state) => state.user
  );

  useEffect(() => {
    if (searchQuery) {
      const filteredSemesterPapers = semesterPapers?.filter((paper) =>
        paper?.title?.toLowerCase().includes(searchQuery.toLowerCase())
      );
      const filteredSessionalPapers = sessionalPapers?.filter((paper) =>
        paper?.title?.toLowerCase().includes(searchQuery.toLowerCase())
      );
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

  return (
    <nav className="bg-[#EFEFEF] dark:text-[#FFFFFF] dark:bg-[#363636] text-[#000000] flex items-center justify-between p-3 sticky top-0 z-50">
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
          className={`h-1 w-6 bg-[#000000] mb-1 transition-all ${
            isOpen ? "rotate-45 translate-y-1.5" : ""
          }`}
        />
        <div
          className={`h-1 w-6 bg-[#000000] mb-1 transition-all ${
            isOpen ? "opacity-0" : ""
          }`}
        />
        <div
          className={`h-1 w-6 bg-[#000000] transition-all ${
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
          className="md:w-1/2 p-3 dark:text-[#FFFFFF] dark:bg-[#3d3c3c] outline-none focus:ring-1 focus:ring-gray-700 rounded-full  placeholder-gray-400"
        />

        {filteredPapers.length > 0 && (
          <div className="mx-4 absolute top-15">
            <div className="grid ">
              {filteredPapers?.slice(0, 3)?.map((paper) => (
                <div
                  key={paper._id}
                  className="w-1/3 p-3 dark:text-[#FFFFFF]  outline-none focus:ring-1 focus:ring-gray-700   placeholder-gray-400"
                >
                  <Link
                    className="no-underline dark:text-[#eeeef2]"
                    to={`/semesterPaper/sessionalPapers/${paper?._id} `}
                  >
                    {paper?.title}
                  </Link>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      {/* Sign In / Sign Up */}
      <div className="hidden md:flex space-x-4">
        <Theme />
        <button className="text-[#030303] text-lg  px-4 py-[10px] rounded-full dark:text-[#FFFFFF] dark:bg-[#363636]">
          Log in
        </button>
        <button className="bg-[#000000] dark:text-[#FFFFFF] dark:bg-[#0F3BFE]  text-[#ffff] hover:bg-blue-600 px-4 py-[10px] rounded-full">
          Sign Up
        </button>
      </div>

      {/* Mobile Menu */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: isOpen ? 1 : 0, y: isOpen ? 0 : -20 }}
        transition={{ duration: 0.2 }}
        className={`absolute top-20 space-x-2 left-0 w-full bg-[#E5E5E5] p-4 space-y-2 md:hidden ${
          isOpen ? "block" : "hidden"
        }`}
      >
        <button className="bg-[#000000]  text-[#ffff] hover:bg-blue-600 px-4 py-[10px] rounded-full">
          Sign In
        </button>
        <button className="bg-[#000000]  text-[#ffff] hover:bg-blue-600 px-4 py-[10px] rounded-full">
          Sign Up
        </button>
      </motion.div>
    </nav>
  );
};

export default Navbar;

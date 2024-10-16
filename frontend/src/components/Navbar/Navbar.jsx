import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FaHome, FaUser, FaCog, FaEnvelope } from "react-icons/fa";
import { IoCreate } from "react-icons/io5";
import { useSelector } from "react-redux";
import Theme from "../Theme/Theme";

const Navbar = () => {
  const isAuth = useSelector((state) => state.auth.isAuthenticated);
  const navItems = [
    { name: "Home", icon: <FaHome />, path: "/" },
    {
      name: "Profile",
      icon: <FaUser />,
      path: isAuth ? "/profile" : "/signIn",
    },
    { name: "Settings", icon: <FaCog />, path: "/settings" },
    { name: "Create", icon: <IoCreate />, path: "/create" },
  ];

  return (
    <div className="fixed bottom-0 flex justify-center p-4 z-50 bg-gray-400 w-full">
      <div className="flex bg-[#fff] space-x-6 drop-shadow-lg shadow-xl p-4 rounded-full w-3/4 md:w-fit max-w-[600px]">
        {navItems.map((item, index) => (
          <Link
            to={item.path}
            key={index}
            className="relative flex flex-col items-center text-[#FFFFFF]"
          >
            <motion.div
              className="cursor-pointer"
              initial={{ opacity: 0.9, scale: 1 }}
              whileHover={{ opacity: 0.8, scale: 1.2 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              <div className="text-xl text-[#08090A] md:text-2xl">
                {item?.icon}
              </div>
              <motion.span
                className="absolute bottom-4 bg-[#08090A] text-white text-sm p-1 rounded transition-opacity duration-200"
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
              >
                {item?.name}
              </motion.span>
            </motion.div>
          </Link>
        ))}
        <Theme />
      </div>
    </div>
  );
};

export default Navbar;

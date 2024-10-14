import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FaHome, FaUser, FaCog, FaEnvelope } from "react-icons/fa";

const navItems = [
  { name: "Home", icon: <FaHome />, path: "/" },
  { name: "Profile", icon: <FaUser />, path: "/profile" },
  { name: "Settings", icon: <FaCog />, path: "/settings" },
  { name: "Messages", icon: <FaEnvelope />, path: "/messages" },
];

const Navbar = () => {
  return (
    <div className="fixed bottom-0 flex justify-center items-centern left-0 right-0   p-4 z-50 md:p-2">
      <div className="flex bg-[#FFFFFF] space-x-8 bg-gray-[#f5f5f5] drop-shadow-lg shadow-xl p-4 rounded-full">
        {navItems.map((item, index) => (
          <Link
            to={item.path}
            key={index}
            className="relative flex flex-col items-center text-[#FFFFFFs]"
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
      </div>
    </div>
  );
};

export default Navbar;

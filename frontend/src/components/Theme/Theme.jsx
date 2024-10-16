import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaSun, FaMoon } from "react-icons/fa";
import { toggleTheme } from "../../Redux/store/slice/ThemeSlice";
import { motion } from "framer-motion";

const Theme = () => {
  const dispatch = useDispatch();
  const theme = useSelector((state) => state.theme.theme);

  const handleClick = () => {
    dispatch(toggleTheme());
  };

  return (
    <button
      onClick={handleClick}
      className="inline-block  relative group text-xl cursor-pointer "
    >
      {theme === "" ? (
        <FaMoon className="text-lg" />
      ) : (
        <FaSun className="text-lg" />
      )}
      <motion.span
        class="absolute bottom-4 left-0 bg-[#08090A] text-white text-sm p-1 rounded transition-opacity duration-200 hidden group-hover:block"
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 1 }}
      >
        Dark
      </motion.span>
    </button>
  );
};

export default Theme;

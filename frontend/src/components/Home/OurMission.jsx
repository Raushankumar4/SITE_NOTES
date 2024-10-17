import React from "react";
import { motion } from "framer-motion";
import { FaRocket } from "react-icons/fa";

const OurMission = () => {
  const fadeIn = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <motion.div
      className="max-w-5xl  mx-auto p-6 bg-[#EFEFEF] rounded-lg shadow-2xl border-l-4 border-[#a6a1a1] dark:bg-[#363636] dark:text-[#d2cbcb] dark:border-blue-500"
      initial="hidden"
      animate="visible"
      variants={fadeIn}
      transition={{ duration: 0.5 }}
    >
      <div className="flex items-center mb-4">
        <FaRocket className="text-blue-500 text-4xl mr-3 dark:text-[#0F3BFE]" />
        <h2 className="text-3xl dark:text-[#0F3BFE] font-semibold text-gray-800">
          Our Mission
        </h2>
      </div>
      <p className="text-lg text-gray-600 mb-4 dark:text-[#d2cbcb]">
        We aim to transform the note-sharing experience by creating a platform
        that promotes collaboration and knowledge accessibility for everyone.
      </p>
      <p className="text-lg text-gray-600 mb-6 dark:text-[#d2cbcb]">
        Empowering communities to share insights and resources anytime,
        anywhere.
      </p>
      <div className="flex justify-center items-center">
        <button className="md:w-1/5 w-1/2 px-2 py-2 bg-[#000000] text-white font-semibold  shadow-md dark:bg-[#0F3BFE] rounded-2xl dark:text-[#ffff] hover:bg-blue-600 transition">
          Join Us
        </button>
      </div>
    </motion.div>
  );
};

export default OurMission;

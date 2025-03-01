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
      className="max-w-4xl mx-auto p-8 rounded-2xl bg-white/10 backdrop-blur-md shadow-xl border border-white/20 dark:bg-[#1a1a1a]/40 dark:border-[#333]"
      initial="hidden"
      animate="visible"
      variants={fadeIn}
      transition={{ duration: 0.5 }}
    >
      <div className="flex items-center gap-3 mb-4">
        <FaRocket className="text-blue-500 text-4xl dark:text-blue-400" />
        <h2 className="text-3xl font-semibold text-gray-900 dark:text-gray-100">
          Our Mission
        </h2>
      </div>
      <p className="text-lg text-gray-800 dark:text-gray-300 mb-4">
        We aim to transform the note-sharing experience by creating a platform
        that promotes collaboration and knowledge accessibility for everyone.
      </p>
      <p className="text-lg text-gray-800 dark:text-gray-300 mb-6">
        Empowering communities to share insights and resources anytime,
        anywhere.
      </p>
      <div className="flex justify-center">
        <button className="px-10 py-2 rounded-lg bg-gradient-to-r from-blue-500 bg-sky-600 text-white font-semibold shadow-lg transform hover:scale-105 transition-all">
          Join Us
        </button>
      </div>
    </motion.div>
  );
};

export default OurMission;

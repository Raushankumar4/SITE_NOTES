import React from "react";
import { motion } from "framer-motion";
import { FaUsers } from "react-icons/fa";

const AboutUs = () => {
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <motion.div
      className="max-w-4xl mx-auto mt-10 p-8 rounded-2xl bg-white/10 backdrop-blur-md shadow-xl border border-white/20 dark:bg-[#1a1a1a]/40 dark:border-[#333]"
      initial="hidden"
      animate="visible"
      variants={fadeIn}
      transition={{ duration: 0.5 }}
    >
      <div className="flex items-center gap-3 mb-6">
        <FaUsers className="text-green-500 text-4xl dark:text-blue-400" />
        <h2 className="text-3xl font-semibold text-gray-900 dark:text-gray-100">
          About Us
        </h2>
      </div>
      <p className="text-lg text-gray-800 dark:text-gray-300 mb-4">
        We are a dedicated team passionate about making knowledge accessible.
        Our platform is designed to facilitate seamless collaboration, allowing
        users to share notes and ideas effortlessly.
      </p>
      <p className="text-lg text-gray-800 dark:text-gray-300 mb-4">
        Our vision is to create a global community where everyone can
        contribute, learn, and grow together. We believe that sharing knowledge
        empowers individuals and strengthens communities.
      </p>
      <p className="text-lg text-gray-800 dark:text-gray-300 mb-6">
        Join us in our mission to transform the way information is shared and
        foster a culture of learning and collaboration.
      </p>
      <div className="flex justify-center">
        <button className="px-10 py-2 rounded-lg bg-gradient-to-r from-green-500 bg-green-300 text-b font-semibold shadow-lg transform hover:scale-105 transition-all">
          Get Involved
        </button>
      </div>
    </motion.div>
  );
};

export default AboutUs;

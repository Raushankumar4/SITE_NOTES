import React from "react";
import { motion } from "framer-motion";
import {
  FaEnvelope,
  FaPhoneAlt,
  FaFacebook,
  FaTwitter,
  FaInstagram,
} from "react-icons/fa";

const GetInTouch = () => {
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <motion.div
      className="max-w-8xl mx-auto p-8   "
      initial="hidden"
      animate="visible"
      variants={fadeIn}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-4xl  dark:text-[#0F3BFE] font-bold text-center text-gray-800 mb-6">
        Get in Touch
      </h2>
      <p className="text-lg text-[#878484]  dark:text-white text-center mb-4">
        We’d love to hear from you! Choose a contact method below:
      </p>
      <div className="flex justify-center items-center md:flex-row md:space-x-4 space-y-4 md:space-y-0 mt-6">
        {/* Email Contact */}
        <a
          href="mailto:raushankumarguptag@gmail.com"
          className="flex items-center p-4 no-underline  dark:text-white  rounded-md transition flex-grow"
        >
          <FaEnvelope className="text-blue-500 text-2xl mr-3" />
          <span className="  rounded-2xl text-[#878484]">Email Us</span>
        </a>

        <a
          href="tel:+919852185318"
          className="flex no-underline items-center p-4 rounded-md transition flex-grow"
        >
          <FaPhoneAlt className="text-green-500 text-2xl mr-3" />
          <span className="  rounded-2xl text-[#878484]">Call Us</span>
        </a>
      </div>
    </motion.div>
  );
};

export default GetInTouch;

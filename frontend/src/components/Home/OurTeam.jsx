import React from "react";
import { motion } from "framer-motion";
import { FaFacebook, FaTwitter, FaLinkedin, FaInstagram } from "react-icons/fa";

const teamMembers = [
  {
    name: "Kamlesh Kumar",
    position: "Front-End-Developer",
    description: "Expert in product development and strategy.",
    image: "https://png.pngtree.com/png-vector/20240205/ourmid/pngtree-man-developer-with-laptop-png-image_11623644.png",
    facebook: "https://www.facebook.com",
    twitter: "https://www.twitter.com",
    linkedin: "https://www.linkedin.com",
    instagram: "https://www.instagram.com",
  },
  {
    name: "Raushan Kumar",
    position: "Back-end developer",
    description: "Passionate about coding and software design.",
    image: "https://cdn3.iconfinder.com/data/icons/web-development-168/512/Man_Web_Developer3.png",
    facebook: "https://www.facebook.com",
    twitter: "https://www.twitter.com",
    linkedin: "https://www.linkedin.com",
    instagram: "https://www.instagram.com",
  }
];

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const OurTeam = () => {
  return (
    <div className="max-w-6xl mx-auto p-8 bg-transparent">
      <h2 className="text-4xl font-bold text-center dark:text-[#0F3BFE] text-gray-800 mb-8">
        Meet Our Team
      </h2>
      <div className="flex justify-center gap-6 flex-wrap">
        {teamMembers.map((member, index) => (
          <motion.div
            key={index}
            className="dark:bg-transparent bg-transparent backdrop-blur-sm backdrop-filter border border-gray-300 dark:border-gray-600 rounded-3xl shadow-lg p-6 text-center transition-transform transform hover:shadow-2xl w-80"
            initial="hidden"
            animate="visible"
            variants={cardVariants}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{ scale: 1.05 }}
          >
            <img
              src={member.image}
              alt={member.name}
              className="w-32 h-32 rounded-full mx-auto mb-4"
            />
            <h3 className="text-xl font-semibold text-black dark:text-white mb-1">
              {member.name}
            </h3>
            <p className="text-gray-300 dark:text-gray-300 mb-2">
              {member.position}
            </p>
            <p className="text-blue-700 dark:text-gray-400 mb-4">
              {member.description}
            </p>
            <div className="flex justify-center space-x-3">
              <a href={member.facebook} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 transition">
                <FaFacebook size={20} />
              </a>
              <a href={member.twitter} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-600 transition">
                <FaTwitter size={20} />
              </a>
              <a href={member.linkedin} target="_blank" rel="noopener noreferrer" className="text-blue-700 hover:text-blue-900 transition">
                <FaLinkedin size={20} />
              </a>
              <a href={member.instagram} target="_blank" rel="noopener noreferrer" className="text-pink-600 hover:text-pink-800 transition">
                <FaInstagram size={20} />
              </a>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default OurTeam;

import React from "react";
import { FaFacebook, FaTwitter, FaLinkedin, FaInstagram } from "react-icons/fa";

const Footer = ({ handleScrollTo }) => {
  return (
    <footer className="py-6">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* About Section */}
          <div>
            <h3 className="text-lg font-bold mb-2">About Us</h3>
            <p className="text-sm">
              We provide a seamless note-sharing experience, enabling
              collaboration and knowledge accessibility for all.
            </p>
          </div>

          {/* Links Section */}
          <div>
            <h3 className="text-lg font-bold mb-2">Quick Links</h3>
            <ul className="text-sm space-y-1">
              <li>
                <button onClick={handleScrollTo} className="hover:underline">
                  About
                </button>
              </li>
              <li>
                <a
                  href="mailto:raushanguptag@gmail.com"
                  className="hover:underline text-[#272828] no-underline"
                >
                  Contact
                </a>
              </li>
              <li>
                <button
                  onClick={handleScrollTo}
                  className="hover:underline cursor-pointer"
                >
                  Terms of Service
                </button>
              </li>
              <li>
                <button onClick={handleScrollTo} className="hover:underline">
                  Privacy Policy
                </button>
              </li>
            </ul>
          </div>

          {/* Social Media Section */}
          <div>
            <h3 className="text-lg font-bold mb-2">Follow Us</h3>
            <div className="flex space-x-4">
              <a
                href="https://www.facebook.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaFacebook className="text-xl hover:text-blue-600 transition" />
              </a>
              <a
                href="https://www.twitter.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaTwitter className="text-xl hover:text-blue-400 transition" />
              </a>
              <a
                href="https://www.linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaLinkedin className="text-xl hover:text-blue-700 transition" />
              </a>
              <a
                href="https://www.instagram.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaInstagram className="text-xl hover:text-pink-600 transition" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-6 pt-4 text-center">
          <p className="text-sm">
            &copy; {new Date().getFullYear()} Site Notes. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

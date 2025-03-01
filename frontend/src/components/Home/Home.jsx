import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import OurMission from "./OurMission";
import AboutUs from "./AboutUs";
import GetInTouch from "./GetInTouch";
import OurTeam from "./OurTeam";
import Footer from "./Footer";
import AOS from "aos";
import "aos/dist/aos.css";

const Home = () => {
  const [showHeader, setShowHeader] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    AOS.init({
      duration: 600,
      easing: "ease-in-out",
      once: false,
    });

    const handleScroll = () => {
      if (typeof window !== "undefined") {
        if (window.scrollY > lastScrollY) {
          // Scrolling down
          setShowHeader(false);
        } else {
          // Scrolling up
          setShowHeader(true);
        }
        setLastScrollY(window.scrollY);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollY]);

  const handleScrollTo = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className="max-w-5xl mt-4 mx-auto overflow-hidden">
      {/* Header Section */}
      <div
        className={`transition-transform duration-300 ${showHeader ? "translate-y-0" : "-translate-y-full"
          }`}
      >
        {/* Welcome Section */}
        <div className="flex justify-center items-center box-border md:h-[87.8vh] h-[90vh]">
          <div className="backdrop-blur-md  backdrop-filter rounded-3xl shadow-xl dark:bg-[#36363653] w-[90%] md:w-[96%] h-auto md:h-[92%] grid grid-cols-1 md:grid-cols-2 items-center p-6 md:p-10 mb-2">
            {/* Left Side Content */}
            <div
              className="flex flex-col items-center text-center"
              data-aos="fade-up"
            >
              <img
                src="Logo.png"
                alt="Illustration"
                className="object-cover w-20 mb-4"
              />
              <h1 className="text-4xl md:text-5xl font-bold text-gray-800 dark:text-blue-300">
                Welcome to
              </h1>
              <p className="text-2xl font-bold text-white">SITE NOTES</p>
              <p
                className="w-full text-lg text-black dark:text-gray-300 leading-relaxed"
                data-aos="fade-right"
              >
                Download all previous semester papers for every branch and year
                easily. Our platform provides access to materials for study and
                collaboration, helping you stay organized.
              </p>

              <Link
                to="/semesterPaper"
                className="mt-4 bg-[#000000] text-white dark:bg-[#0F3BFE] dark:text-white px-4 py-2 rounded-xl no-underline shadow-md hover:shadow-lg transition"
              >
                Get Started
              </Link>
            </div>
            {/* Right Side Image */}
            <div
              className="flex justify-center items-center"
              data-aos="fade-left"
            >
              <img
                src="https://r2.erweima.ai/imgcompressed/img/compressed_6a91ef87563da7bf0eba917d6848f0e4.webp"
                alt="Notes Illustration"
                className="object-cover h-[50vh] md:block hidden rounded-md"
              />
            </div>
          </div>
        </div>
      </div>

      <div>
        <div className="mx-4" data-aos="fade-up">
          <OurMission />
        </div>
        <div className="mx-4" data-aos="fade-right" data-aos-delay="100">
          <AboutUs />
        </div>
        <div className="mx-4" data-aos="fade-left" data-aos-delay="200">
          <OurTeam />
        </div>
        <div data-aos="fade-up" data-aos-delay="300">
          <GetInTouch />
        </div>
        <div className="mx-10" data-aos="fade-down" data-aos-delay="400">
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default Home;

import React, { useEffect } from "react";
import Navbar from "./components/Navbar/Navbar";
import { Outlet, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import AOS from "aos";
import "aos/dist/aos.css";

const App = () => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const navigate = useNavigate();

  const theme = useSelector((state) => state.theme.theme);
  console.log(theme);

  useEffect(() => {
    // Initialize AOS
    AOS.init({
      duration: 600, // Animation duration
      easing: "ease-in-out",
      once: true, // Animation happens only once
    });

    // Set theme class on body
    document.body.className = theme;
  }, [theme]);

  useEffect(() => {
    // Redirect if not authenticated
    if (!isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className="body min-h-screen" data-aos="fade-down">
      <Navbar />
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default App;

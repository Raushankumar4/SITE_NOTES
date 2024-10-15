import React, { useEffect } from "react";
import Navbar from "./components/Navbar/Navbar";
import { Outlet, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const App = () => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/signIn");
    }
  }, []);

  return (
    <div className="bg-[#FFFFFF]">
      <Navbar />
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default App;

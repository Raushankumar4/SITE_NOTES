import React, { useEffect } from "react";
import Navbar from "./components/Navbar/Navbar";
import { Outlet, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const App = () => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const navigate = useNavigate();

  const theme = useSelector((state) => state.theme.theme);
  console.log(theme);

  useEffect(() => {
    document.body.className = theme;
  }, [theme]);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/");
    }
  }, []);

  return (
    <div className="bg-[#EFEFEF]  dark:bg-[#363636]">
      <Navbar />
      <main className="">
        <Outlet />
      </main>
    </div>
  );
};

export default App;

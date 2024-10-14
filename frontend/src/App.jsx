import React from "react";
import Navbar from "./components/Navbar/Navbar";
import { Outlet } from "react-router-dom";

const App = () => {
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

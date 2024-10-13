import React from "react";
import Navbar from "./components/Navbar/Navbar";
import { Outlet } from "react-router-dom";

const App = () => {
  return (
    <div className="mt-10">
      <Navbar  />
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default App;

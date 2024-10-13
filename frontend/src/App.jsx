import React from "react";
import Navbar from "./components/Navbar/Navbar";
import { Outlet } from "react-router-dom";

const App = () => {
  return (
    <div className="bg-gray-100 min-h-screen">
      <Navbar />
      <main className="p-10">
        <Outlet />
      </main>
    </div>
  );
};

export default App;

import React from "react";
import Navbar from "./components/Navbar/Navbar";
import { Outlet } from "react-router-dom";

const App = () => {
  return (
    <div>
      <Navbar />
      <main className="">
        <Outlet />
      </main>
    </div>
  );
};

export default App;

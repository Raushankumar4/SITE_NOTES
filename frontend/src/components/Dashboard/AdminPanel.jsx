import React, { useState } from "react";
import {
  Users,
  FileText,
  Shield,
  Bell,
  Settings,
  LogOut,
  Menu,
  X,
  Sun,
  Moon,
} from "lucide-react";

const Dashboard = () => {
  const [tab, setTab] = useState("users");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [darkMode, setDarkMode] = useState(false);

  return (
    <div
      className={`flex min-h-screen font-sans transition-colors duration-300 ${
        darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"
      }`}
    >
      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 ${
          darkMode ? "bg-gray-800" : "bg-white"
        } shadow-xl p-6 w-72 transition-transform duration-300 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-72"
        } sm:translate-x-0 rounded-r-xl`}
      >
        <div className="flex items-center justify-between">
          <h2
            className={`text-2xl font-bold ${
              darkMode ? "text-indigo-300" : "text-indigo-600"
            }`}
          >
            Dashboard
          </h2>
          <button
            className="sm:hidden text-gray-400 hover:text-red-400"
            onClick={() => setIsSidebarOpen(false)}
          >
            <X size={24} />
          </button>
        </div>
        <nav className="mt-6 space-y-3">
          {[
            { name: "Users", icon: <Users size={20} /> },
            { name: "Notes", icon: <FileText size={20} /> },
            { name: "Security", icon: <Shield size={20} /> },
            { name: "Reports", icon: <Bell size={20} /> },
            { name: "Settings", icon: <Settings size={20} /> },
            { name: "LogOut", icon: <LogOut size={20} /> },
          ].map((item) => (
            <button
              key={item.name}
              onClick={() => setTab(item.name.toLowerCase())}
              className={`flex items-center gap-3 w-full px-4 py-3 rounded-lg text-lg transition ${
                tab === item.name.toLowerCase()
                  ? "bg-indigo-600 text-white shadow-lg"
                  : darkMode
                  ? "hover:bg-gray-700"
                  : "hover:bg-gray-200"
              }`}
            >
              {item.icon} {item.name}
            </button>
          ))}
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8 sm:ml-72">
        {/* Navbar */}
        <div
          className={`flex items-center justify-between ${
            darkMode ? "bg-gray-800" : "bg-white"
          } p-4 shadow-lg rounded-xl`}
        >
          <button
            className="sm:hidden text-gray-600"
            onClick={() => setIsSidebarOpen(true)}
          >
            <Menu size={24} />
          </button>
          <h1 className="text-2xl font-bold">Admin Dashboard</h1>
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="p-2 rounded-full bg-indigo-500 text-white hover:bg-indigo-700"
          >
            {darkMode ? <Sun size={24} /> : <Moon size={24} />}
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mt-8">
          {[
            {
              label: "Total Teachers",
              value: 1234,
              icon: <Users size={40} className="text-indigo-600" />,
            },
            {
              label: "Total Students",
              value: 987,
              icon: <Users size={40} className="text-green-600" />,
            },
            {
              label: "Reported Users",
              value: 32,
              icon: <Users size={40} className="text-red-600" />,
            },
            {
              label: "Total Notes",
              value: 5678,
              icon: <FileText size={40} className="text-purple-600" />,
            },
          ].map((item, index) => (
            <div
              key={index}
              className={`shadow-xl rounded-2xl p-8 flex flex-col items-center text-center transform hover:scale-105 transition duration-300 ${
                darkMode ? "bg-gray-800 text-white" : "bg-white text-gray-900"
              }`}
            >
              {item.icon}
              <h3 className="text-lg font-semibold mt-2">{item.label}</h3>
              <p className="text-4xl font-extrabold mt-2">{item.value}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

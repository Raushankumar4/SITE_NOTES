import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const Dashboard = () => {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await axios.get(
          "http://localhost:2000/api/v1/users/dashboard"
        );
        setStats(response.data);
      } catch (error) {
        console.error("Error fetching dashboard stats:", error);
      }
    };

    fetchStats();
  }, []);

  if (!stats) {
    return <p className="text-center mt-5">Loading dashboard stats...</p>;
  }

  const chartData = [
    { name: "Teachers", value: stats.totalTeachers },
    { name: "Students", value: stats.totalStudents },
    { name: "Notes", value: stats.totalNotes },
    { name: "Sessional Notes", value: stats.totalSessionalNotes },
    { name: "Reports", value: stats.totalReports },
    { name: "Rejected", value: stats.totalRejects },
    { name: "Approved", value: stats.totalApproved },
    { name: "Pending", value: stats.totalPendings },
  ];

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-6">Admin Dashboard</h1>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-10">
        {[
          {
            label: "Teachers",
            value: stats.totalTeachers,
            color: "bg-blue-500",
          },
          {
            label: "Students",
            value: stats.totalStudents,
            color: "bg-green-500",
          },
          { label: "Notes", value: stats.totalNotes, color: "bg-yellow-500" },
          {
            label: "Sessional Notes",
            value: stats.totalSessionalNotes,
            color: "bg-purple-500",
          },
          { label: "Reports", value: stats.totalReports, color: "bg-red-500" },
          {
            label: "Rejected",
            value: stats.totalRejects,
            color: "bg-gray-500",
          },
          {
            label: "Approved",
            value: stats.totalApproved,
            color: "bg-indigo-500",
          },
          {
            label: "Pending",
            value: stats.totalPendings,
            color: "bg-orange-500",
          },
        ].map((item, index) => (
          <div
            key={index}
            className={`p-6 text-white rounded-lg ${item.color} shadow-lg`}
          >
            <h2 className="text-2xl font-semibold">{item.value}</h2>
            <p className="text-lg">{item.label}</p>
          </div>
        ))}
      </div>

      {/* Chart */}
      <div className="w-full h-[400px] bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-xl font-semibold text-center mb-4">
          Dashboard Overview
        </h2>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={chartData}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          >
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="value" fill="#8884d8" barSize={50} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Dashboard;

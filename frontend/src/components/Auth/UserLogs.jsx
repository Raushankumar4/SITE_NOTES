import React, { useState, useEffect } from "react";
import axios from "axios";
import { AUTH } from "../../constant";
import { useSelector } from "react-redux";

const UserLogs = () => {
  const [logs, setLogs] = useState([]);

  const token = useSelector(state => state.auth.token)
  console.log("Token", token);


  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const { data } = await axios.get(`${AUTH}/user-activity`, {
          headers: token ? { Authorization: `Bearer ${token}` } : {},
          withCredentials: true,
        });
        setLogs(data.activities);
      } catch (error) {
        console.error("Error fetching logs:", error);
      }
    };

    fetchLogs();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-xl font-bold mb-4">User Login Logs</h2>
      <table className="min-w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border px-4 py-2">#</th>
            <th className="border px-4 py-2">User Name</th>
            <th className="border px-4 py-2">Email</th>
            <th className="border px-4 py-2">Branch</th>
            <th className="border px-4 py-2">Year</th>
            <th className="border px-4 py-2">Role</th>
            <th className="border px-4 py-2">Phone</th>
            <th className="border px-4 py-2">Login Time</th>
            <th className="border px-4 py-2">IP Address</th>
            <th className="border px-4 py-2">Device</th>
          </tr>
        </thead>
        <tbody>
          {logs.map((log, index) => (
            <tr key={log._id} className="hover:bg-gray-50">
              <td className="border px-4 py-2">{index + 1}</td>
              <td className="border px-4 py-2">{log.userName}</td>
              <td className="border px-4 py-2">{log.userEmail}</td>
              <td className="border px-4 py-2">{log.userBranch}</td>
              <td className="border px-4 py-2">{log.userselectYear}</td>
              <td className="border px-4 py-2">{log.userRole}</td>
              <td className="border px-4 py-2">{log.userPhoneNumber}</td>
              <td className="border px-4 py-2">{new Date(log.loginTime).toLocaleString()}</td>
              <td className="border px-4 py-2">{log.ipAddress}</td>
              <td className="border px-4 py-2">{log.deviceInfo}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserLogs;

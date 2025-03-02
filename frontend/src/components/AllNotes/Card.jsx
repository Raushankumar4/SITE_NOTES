import React, { useState } from "react";
import { FaEye, FaEdit, FaTrash, FaFlag } from "react-icons/fa";
import { useSelector } from "react-redux";
import { useGetAllSemesterPapers } from "../../hooks/useGetAllSemesterPapers";
import { Link } from "react-router-dom";
import SelectOption from "../InputField/SelectOption";
import { useDeleteSemester } from "../../hooks/useDeleteSemesterPaper";
import { useGetProfile } from "../../hooks/useGetProfile";

const Card = () => {
  const options = [
    { value: "CSE", label: "CSE" },
    { value: "ECE", label: "ECE" },
    { value: "EEE", label: "EEE" },
    { value: "MECH", label: "MECH" },
    { value: "CIVIL", label: "CIVIL" },
    { value: "IT", label: "IT" },
    { value: "EIE", label: "EIE" },
    { value: "CHEMICAL", label: "CHEMICAL" },
    { value: "BIOTECH", label: "BIOTECH" },
    { value: "OTHERS", label: "OTHERS" },
  ];

  const yearOptions = [
    { value: "1st", label: "I" },
    { value: "2nd", label: "II" },
    { value: "3rd", label: "III" },
    { value: "4th", label: "IV" },
  ];

  const { semesterPapers, user } = useSelector((state) => state.user);
  useGetProfile();
  useGetAllSemesterPapers();

  const [selectedBranch, setSelectedBranch] = useState("");
  const [selectedYear, setSelectedYear] = useState("");

  const filteredPapers = semesterPapers?.filter((paper) => {
    const matchesBranch = selectedBranch
      ? paper?.branch === selectedBranch
      : true;
    const matchesYear = selectedYear
      ? paper?.selectYear === selectedYear
      : true;
    return matchesBranch && matchesYear;
  });

  const { deletePaper } = useDeleteSemester();

  const handleDeletePaper = (id) => {
    if (window.confirm("Are you sure you want to delete this paper?")) {
      deletePaper(id);
    }
  };

  const handleReportPaper = (id) => {
    alert(`Reported Paper ID: ${id}`);
    // You can implement an API call here to report the paper
  };

  if (!semesterPapers || semesterPapers.length === 0) {
    return (
      <div className="text-center text-lg text-gray-700">
        No semester papers available.
      </div>
    );
  }

  return (
    <div className="mt-10 max-w-6xl mx-auto p-6 bg-gray-400 shadow-xl rounded-xl">
      <div className="flex flex-col md:flex-row justify-between items-center mb-6">
        <SelectOption
          options={options}
          name="selectBranch"
          label="Select Branch"
          onChange={(e) => setSelectedBranch(e.target.value)}
        />
        <SelectOption
          options={yearOptions}
          name="selectYear"
          label="Select Year"
          onChange={(e) => setSelectedYear(e.target.value)}
        />
      </div>

      {filteredPapers.length === 0 ? (
        <h1 className="text-lg text-gray-700 text-center">
          No semester papers available.
        </h1>
      ) : (
        <ul className="space-y-2">
          {filteredPapers.map((paper) => (
            <li
              key={paper?._id}
              className="glass shadow-lg rounded-xl overflow-hidden hover:shadow-2xl transition-shadow duration-300 bg-gradient-to-r from-white to-gray-100 p-6"
            >
              <h2 className="text-xl font-bold text-gray-800 truncate">
                {paper?.title}
              </h2>
              <p className="mt-2 text-gray-600 text-sm truncate">
                {paper?.description}
              </p>

              <div className="mt-2 flex justify-between text-gray-500 text-sm">
                <span>📌 Branch: {paper?.branch}</span>
                <span>📅 Year: {paper?.selectYear}</span>
              </div>

              {/* ✅ Uploaded by & Role */}
              <div className="mt-2 text-gray-500 text-sm">
                <span>
                  👤 Uploaded by: <strong className="text-gray-700">{paper?.userId?.fullName || "Unknown"}</strong>
                </span>
                <br />
                <br />
                <span>
                  🎭 Role: <strong className="text-gray-700">{paper?.userId?.role || "N/A"}</strong>
                </span>
              </div>

              <div className="mt-4 flex justify-end space-x-3">
                <Link
                  to={`view/${paper?._id}`}
                  className="px-3 py-2 text-white bg-blue-500 rounded-lg flex items-center hover:bg-blue-600 transition"
                >
                  <FaEye className="mr-1" />
                  View
                </Link>

                {user?._id === paper?.userId && (
                  <Link
                    to={`edit/${paper?._id}`}
                    className="px-3 py-2 text-white bg-green-500 rounded-lg flex items-center hover:bg-green-600 transition"
                  >
                    <FaEdit className="mr-1" />
                    Edit
                  </Link>
                )}

                {user?._id === paper?.userId && (
                  <button
                    onClick={() => handleDeletePaper(paper?._id)}
                    className="px-3 py-2 text-white bg-red-500 rounded-lg flex items-center hover:bg-red-600 transition"
                  >
                    <FaTrash className="mr-1" />
                    Delete
                  </button>
                )}

                <button
                  onClick={() => handleReportPaper(paper?._id)}
                  className="px-3 py-2 text-white bg-yellow-500 rounded-lg flex items-center hover:bg-yellow-600 transition"
                >
                  <FaFlag className="mr-1" />
                  Report
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Card;

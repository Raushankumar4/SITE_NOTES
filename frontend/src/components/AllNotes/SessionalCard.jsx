import React, { useState } from "react";
import SelectOption from "../InputField/SelectOption";
import { FaEdit, FaEye, FaTrash, FaDownload } from "react-icons/fa";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useGetSessionalPaper } from "../../hooks/useGetSessionalPaper";
import { useSelector } from "react-redux";
import { useDeleteSessional } from "../../hooks/useDeleteSessional";
import { SERVER } from "../../constant";
import { useGetProfile } from "../../hooks/useGetProfile";

const SessionalCard = () => {
  const allBranches = [
    { value: "CSE", label: "CSE" },
    { value: "ECE", label: "ECE" },
    { value: "MECH", label: "MECH" },
    { value: "CE", label: "CE" },
    { value: "CIVIL", label: "CIVIL" },
    { value: "IT", label: "IT" },
  ];

  const yearOptions = [
    { value: "I", label: "I" },
    { value: "II", label: "II" },
    { value: "III", label: "III" },
    { value: "IV", label: "IV" },
  ];

  const { id } = useParams();
  useGetSessionalPaper(id);
  const { sessionalPapers, user } = useSelector((state) => state.user);
  useGetProfile();

  const { deleteSessional } = useDeleteSessional();
  const navigate = useNavigate();
  const handleDelete = (paperId) => {
    if (window.confirm("Are you sure you want to delete this paper?")) {
      deleteSessional(paperId).then(() => {
        navigate(-1);
      });
    }
  };

  if (!sessionalPapers || sessionalPapers?.length === 0) {
    return (
      <div className="text-center text-lg">No sessional papers available.</div>
    );
  }

  const [selectedBranch, setSelectedBranch] = useState("");
  const [selectedYear, setSelectedYear] = useState("");

  const filterSessional = sessionalPapers?.filter((paper) => {
    const matchesBranch = selectedBranch
      ? paper?.branch === selectedBranch
      : true;
    const matchesYear = selectedYear
      ? paper?.selectYear === selectedYear
      : true;
    return matchesBranch && matchesYear;
  });

  return (
    <div className="mt-10 max-w-5xl mx-auto p-4">
      <div className="flex flex-col md:flex-row justify-between mb-4">
        <div className="ml-10">
          <SelectOption
            options={allBranches}
            name="selectBranch"
            label="Select Branch"
            onChange={(e) => setSelectedBranch(e.target.value)}
          />
        </div>
        <div className="ml-10 md:ml-0">
          <SelectOption
            options={yearOptions}
            name="selectYear"
            label="Select Year"
            onChange={(e) => setSelectedYear(e.target.value)}
          />
        </div>
      </div>

      {filterSessional?.length === 0 ? (
        <h1 className="text-lg text-gray-700 text-center">
          No Sessional papers available.
        </h1>
      ) : (
        <ul className="space-y-4">
          {filterSessional?.map((paper) => (
            <li
              key={paper?._id}
              className="glass shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
            >
              <div className="p-4">
                <h2 className="text-lg font-semibold text-gray-800 truncate">
                  {paper?.title}
                </h2>
                <p className="mt-1 text-gray-600 text-sm truncate">
                  {paper?.description}
                </p>
                <div className="mt-2 flex justify-between text-gray-500 text-xs">
                  <span>Branch: {paper?.branch}</span>
                  <span>Year: {paper?.selectYear?.length}</span>
                </div>
              </div>
              <div className="p-2 flex justify-end bg-[#fefdff0f] space-x-2">
                <Link
                  to={`sessionalPaper/${paper?._id}`}
                  className="flex no-underline items-center text-blue-500 hover:text-blue-700 text-xs font-semibold"
                >
                  <FaEye className="mr-1" />
                  View
                </Link>
                <Link
                  to={`updateSessional/${paper?._id}`}
                  className="flex no-underline items-center text-green-500 hover:text-green-700 text-xs font-semibold"
                >
                  <FaEdit className="mr-1" />
                  Edit
                </Link>
                <button
                  onClick={() => {
                    const link = document.createElement("a");
                    link.href = `${SERVER}/${paper?.sessionalPdf}`;
                    link.download = paper?.title || "document.pdf";
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);
                  }}
                  href={paper?.sessionalPdf}
                  download
                  className="flex no-underline cursor-pointer items-center text-blue-500 hover:text-blue-700 text-xs font-semibold"
                >
                  <FaDownload className="mr-1" />
                  Download PDF
                </button>
                {user?._id === paper?.userId && (
                  <button
                    onClick={() => handleDelete(paper?._id)}
                    className="flex no-underline items-center text-red-500 hover:text-red-700 text-xs font-semibold"
                  >
                    <FaTrash className="mr-1" />
                    Delete
                  </button>
                )}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SessionalCard;

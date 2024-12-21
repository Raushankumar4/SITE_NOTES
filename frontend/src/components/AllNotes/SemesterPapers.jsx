import React from "react";
import { useSelector } from "react-redux";
import { useGetAllSemesterPapers } from "../../hooks/useGetAllSemesterPapers";
import { SERVER } from "../../constant";
import { useDeleteSemester } from "../../hooks/useDeleteSemesterPaper";
import { Link, useParams } from "react-router-dom";
import { FaTrash, FaPlusCircle, FaFilePdf, FaDownload } from "react-icons/fa";
import SessionalCard from "./SessionalCard";
import { useGetProfile } from "../../hooks/useGetProfile";

const SemesterPapers = () => {
  const { id } = useParams();
  useGetAllSemesterPapers(id);
  const { semesterPapers ,user} = useSelector((state) => state.user);
  const paper = semesterPapers.find((paper) => paper?._id === id);
  useGetProfile()

  const { deletePaper } = useDeleteSemester();

  if (!semesterPapers || semesterPapers.length === 0) {
    return (
      <div className="text-center text-lg mt-8">
        No semester papers available.
      </div>
    );
  }

  const handleDeletePaper = (id) => {
    if (window.confirm("Are you sure you want to delete this paper?")) {
      deletePaper(id);
    }
  };

  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = `${SERVER}/${paper?.notesPdf}`;
    link.download = paper?.title || "document.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex flex-col md:flex-row justify-between items-start ">
        <div className="flex flex-col mb-4 md:mb-0">
          <h1 className="text-3xl md:text-4xl font-semibold">
            Semester Papers
          </h1>
          <h4 className="text-gray-100 ">Semester: {paper?.title}</h4>
          <h4>Branch: {paper?.branch}</h4>
          <p className="text-gray-100">Year(s): {paper?.selectYear?.length}</p>
        </div>
        <Link
          className="flex items-center text-white px-4 py-2 rounded-md shadow hover:bg-blue-600 transition duration-200 ease-in-out no-underline"
          to={`createSessional`}
        >
          <FaPlusCircle className="mr-2" />
          Add Sessional Paper
        </Link>
      </div>

      <div className="flex flex-col md:flex-row justify-between items-start mb-4">
       {
         user?._id === paper?.userId && (
           <button
             onClick={() => handleDeletePaper(paper?._id)}
             className="flex items-center text-red-500 hover:text-red-700"
           >
             <FaTrash className="mr-2" />
             Delete Paper
           </button>
         )
       }
        {
          user?._id === paper?.userId && (
            <Link
              className="flex items-center text-white px-4 py-2 rounded-md shadow hover:bg-blue-600 transition duration-200 ease-in-out no-underline"
              to={`edit/${paper?._id}`}
            >
              <FaFilePdf className="mr-2" />
              Edit Paper
            </Link>
          )
        }
        <button
          onClick={handleDownload}
          className="flex items-center text-green-500 hover:text-green-700"
        >
          <FaDownload className="mr-2" />
          Download PDF
        </button>
      </div>

      <div className="border rounded-lg p-4 mb-4 overflow-hidden">
        <iframe
          src={`${SERVER}/${paper?.notesPdf}`}
          className="w-full h-96 md:h-80 lg:h-[500px] border rounded-lg"
          title={paper?.title}
          allowFullScreen
          loading="lazy"
        />
      </div>
      <div>
        <h1 className="text-2xl font-bold">Sessional Papers</h1>
        <SessionalCard />
      </div>
    </div>
  );
};

export default SemesterPapers;

import React from "react";
import { useSelector } from "react-redux";
import { useGetAllSemesterPapers } from "../../hooks/useGetAllSemesterPapers";
import { SERVER } from "../../constant";

const SemesterPapers = () => {
  const { semesterPapers } = useSelector((state) => state.user);
  useGetAllSemesterPapers();

  if (!semesterPapers || semesterPapers.length === 0) {
    return (
      <div className="text-center text-lg">No semester papers available.</div>
    );
  }

  return (
    <div className="p-6 mt-[4vw]">
      <h1 className="text-2xl font-bold text-center mb-6">Semester Papers</h1>
      <div className="space-y-6">
        {semesterPapers?.map((paper) => (
          <div
            className="border rounded-lg shadow-md p-4 bg-white"
            key={paper?._id}
          >
            <h2 className="text-xl font-semibold mb-2">{paper?.title}</h2>
            <div className="relative">
              <p className="text-gray-700">{paper?.description}</p>
              <embed
                src={`${SERVER}/${paper?.notesPdf}`}
                type="application/pdf"
                className="w-full h-96 border rounded-lg"
                title={paper?.title}
              />
              <a
                href={`${SERVER}/${paper?.notesPdf}`}
                download
                className="mt-2 inline-block px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition duration-200"
              >
                Download PDF
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SemesterPapers;

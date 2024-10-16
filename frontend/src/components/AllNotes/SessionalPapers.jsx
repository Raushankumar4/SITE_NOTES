import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useGetSessionalPaper } from "../../hooks/useGetSessionalPaper";
import { useSelector } from "react-redux";
import { SERVER } from "../../constant";
import { FaTrash, FaPlus, FaEdit } from "react-icons/fa";
import { useDeleteSessional } from "../../hooks/useDeleteSessional";

const SessionalPapers = () => {
  const { id } = useParams();
  useGetSessionalPaper(id);
  const { sessionalPapers } = useSelector((state) => state.user);
  const sessionalPaper = sessionalPapers?.filter((paper) => paper?.note === id);
  console.log(sessionalPaper);

  const nav = useNavigate();

  const { deleteSessional } = useDeleteSessional();

  const handleDelete = (paperId) => {
    if (window.confirm("Are you sure you want to delete this paper?")) {
      deleteSessional(paperId);
    }
  };

  const handleAdd = () => {
    nav(`/semesterPaper/createSessional/${id}`);
  };

  const handleEdit = (paperId) => {
    nav(`/semesterPaper/updateSessional/${paperId}`);
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Sessional Papers</h1>
        <button
          onClick={handleAdd}
          className="flex items-center bg-blue-500 text-white px-4 py-2 rounded-md shadow hover:bg-blue-600 transition duration-200"
        >
          <FaPlus className="mr-2" /> Add Paper
        </button>
      </div>
      {sessionalPaper?.length > 0 ? (
        sessionalPaper?.map((paper) => (
          <div
            className="border rounded-lg shadow-md p-4 mb-4 bg-white"
            key={paper?._id}
          >
            <h2 className="text-lg font-bold mb-2">{paper?.title}</h2>
            <p className="text-gray-700 mb-2">{paper?.description}</p>
            <p className="text-gray-600">Branch: {paper?.branch}</p>
            <p className="text-gray-600">Year: {paper?.selectYear}</p>
            <p className="text-gray-600">
              Created At: {new Date(paper?.createdAt).toLocaleDateString()}
            </p>
            <iframe
              src={`${SERVER}/${paper?.sessionalPdf}`}
              className="w-full h-96 my-4"
              title={paper?.title}
            ></iframe>
            <div className="flex space-x-4">
              <button
                onClick={() => handleEdit(paper?._id)}
                className="flex items-center text-yellow-500 hover:text-yellow-700 transition duration-200"
              >
                <FaEdit className="mr-1" /> Edit
              </button>
              <button
                onClick={() => handleDelete(paper?._id)}
                className="flex items-center text-red-500 hover:text-red-700 transition duration-200"
              >
                <FaTrash className="mr-1" /> Delete
              </button>
            </div>
          </div>
        ))
      ) : (
        <div className="text-center text-lg">
          No sessional papers available.
        </div>
      )}
    </div>
  );
};

export default SessionalPapers;

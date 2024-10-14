import { useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { NOTES } from "../constant";
import { useNavigate } from "react-router-dom";
import { SERVER } from "../constant";

export const useUpdateSemesterPaper = (semeseterId) => {
  const [loading, setLoading] = useState(false);
  const token = useSelector((state) => state.auth.token);
  const { semesterPapers } = useSelector((state) => state.user);
  const paper = semesterPapers.find((paper) => paper?._id === semeseterId);
  const navigate = useNavigate();
  const [filePreview, setFilePreview] = useState(
    `${SERVER}/${paper?.notesPdf}` || null
  );
  const [userInput, setUserInput] = useState({
    title: paper?.title || "",
    description: paper?.description || "",
    branch: paper?.branch || "",
    selectYear: paper?.selectYear || "",
    notesPdf: null,
  });

  const handleOnChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "notesPdf") {
      const file = files[0];
      setUserInput((prev) => ({
        ...prev,
        [name]: file,
      }));
      const preview = URL.createObjectURL(file);
      setFilePreview(preview);
    } else {
      setUserInput((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleOnUpdate = async (e) => {
    if (!token) return;
    e.preventDefault();
    setLoading(true);
    const formData = new FormData();
    if (userInput.notesPdf) formData.append("notesPdf", userInput.notesPdf);
    formData.append("title", userInput.title);
    formData.append("description", userInput.description);
    formData.append("branch", userInput.branch);
    formData.append("selectYear", userInput.selectYear);

    try {
      const { data } = await axios.put(
        `${NOTES}/updateNote/${semeseterId}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(data);
      navigate(-1);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return {
    setFilePreview,
    filePreview,
    handleOnChange,
    userInput,
    handleOnUpdate,
    loading,
  };
};

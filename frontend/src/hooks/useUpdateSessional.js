import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { NOTES, SERVER } from "../constant";
import { toast } from "react-hot-toast";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { setRefresh } from "../Redux/store/slice/userSlice";

export const useUpdateSessional = (sessionalId) => {
  const token = useSelector((state) => state.auth.token);
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Initialize navigate
  const [loading, setLoading] = useState(false);
  const { sessionalPapers } = useSelector((state) => state.user);
  const paper = sessionalPapers.find((paper) => paper?._id === sessionalId);

  const [userInput, setUserInput] = useState({
    title: paper?.title || "",
    description: paper?.description || "",
    branch: paper?.branch || "",
    selectYear: paper?.selectYear || "",
    sessionalPdf: null,
  });
  const [filePreview, setFilePreview] = useState(
    `${SERVER}/${paper?.sessionalPdf}` || null
  );

  const handleOnChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "sessionalPdf") {
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

  const handleSubmit = async (e) => {
    if (!token) return;
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", userInput.title);
    formData.append("description", userInput.description);
    formData.append("branch", userInput.branch);
    formData.append("selectYear", userInput.selectYear);

    if (userInput.sessionalPdf) {
      formData.append("sessionalPdf", userInput.sessionalPdf);
    }
    setLoading(true);
    try {
      const response = await axios.put(
        `${NOTES}/updateSessional/${sessionalId}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );
      dispatch(setRefresh(true));
      toast.success(response?.data?.message);
      navigate(-1);
    } catch (error) {
      toast.error(error?.response?.data?.message || error?.message);
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    filePreview,
    setFilePreview,
    userInput,
    handleOnChange,
    handleSubmit,
  };
};

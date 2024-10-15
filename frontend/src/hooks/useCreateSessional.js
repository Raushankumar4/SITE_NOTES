import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { NOTES } from "../constant";
import { toast } from "react-hot-toast";
import { setRefresh } from "../Redux/store/slice/userSlice";

export const useCreateSessionalPaper = (semseterId) => {
  const token = useSelector((state) => state.auth.token);
  const dispatch = useDispatch();
  const [filePreview, setFilePreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({});
  const [userInput, setUserInput] = useState({
    title: "",
    description: "",
    branch: "",
    selectYear: "",
    sessionalPdf: null,
  });
  const validateForm = () => {
    const { title, description, branch, selectYear, sessionalPdf } = userInput;
    const newErrors = {};
    if (!title) newErrors.title = "title is required";
    if (!description) newErrors.description = "description is required";
    if (!branch) newErrors.branch = "branch is required";
    if (!selectYear) newErrors.selectYear = "selectYear is required";
    if (!sessionalPdf) newErrors.sessionalPdf = "sessionalPdf is required";
    setError(newErrors);
    return Object.keys(newErrors).length === 0 ? null : newErrors;
  };
  const hanldeOnChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "sessionalPdf") {
      const file = files[0];
      setUserInput((prev) => ({
        ...prev,
        [name]: file,
      }));
      const filePrev = URL.createObjectURL(file);
      setFilePreview(filePrev);
    } else {
      setUserInput((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleCreateSessional = async (e) => {
    if (!token) return;
    e.preventDefault();
    setLoading(true);
    const validationErrors = validateForm();
    if (validationErrors) return;
    const formData = new FormData();
    if (userInput.sessionalPdf)
      formData.append("sessionalPdf", userInput.sessionalPdf);
    formData.append("title", userInput.title);
    formData.append("description", userInput.description);
    formData.append("branch", userInput.branch);
    formData.append("selectYear", userInput.selectYear);
    try {
      const { data } = await axios.post(
        `${NOTES}/createSessional/${semseterId}`,
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
      toast.success(data?.message);
      console.log(data);
    } catch (error) {
      toast.error(error?.response?.data?.message || error?.message);
    } finally {
      setLoading(false);
    }
  };
  return {
    handleCreateSessional,
    hanldeOnChange,
    userInput,
    filePreview,
    setFilePreview,
    error,
    loading,
  };
};

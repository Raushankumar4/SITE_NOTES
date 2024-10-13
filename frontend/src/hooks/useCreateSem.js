import { useState } from "react";
import axios from "axios";
import { NOTES } from "../constant";
import { toast } from "react-hot-toast";
import { useSelector } from "react-redux";

export const useCreateSem = () => {
  const [createSem, setCreateSem] = useState({
    title: "",
    description: "",
    notesPdf: null,
    branch: "",
  });
  const [filePreview, setFilePreview] = useState(null);
  const [loadings, setLoadings] = useState(false);
  const [error, setError] = useState({});
  const token = useSelector((state) => state.auth.token);
  const handleOnChange = (e) => {
    const { name, files, value } = e.target;
    if (name === "notesPdf") {
      const file = files[0];
      if (file) {
        const fileLink = URL.createObjectURL(file);
        setFilePreview(fileLink);
      }
      setCreateSem((prev) => ({
        ...prev,
        [name]: file,
      }));
    } else {
      setCreateSem((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const validate = () => {
    const { title, description, notesPdf, branch } = createSem;
    const newErrors = {};
    if (!title) newErrors.title = "title is required";
    if (!description) newErrors.description = "description is required";
    if (!notesPdf) newErrors.notesPdf = "notesPdf is required";
    if (!branch) newErrors.branch = "branch is required";
    setError(newErrors);
    return Object.keys(newErrors).length === 0 ? null : newErrors;
  };

  const handleOnCreate = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (validationErrors) return;
    setLoadings(true);
    const formData = new FormData();
    if (createSem.notesPdf) formData.append("notesPdf", createSem.notesPdf);
    formData.append("title", createSem.title);
    formData.append("description", createSem.description);
    formData.append("branch", createSem.branch);
    try {
      const { data } = await axios.post(`${NOTES}/createNote`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      });
      toast.success(data?.message);
      console.log(data);
    } catch (error) {
      toast.error(error?.response?.data?.message || error?.message);
    } finally {
      setLoadings(false);
    }
  };

  return {
    createSem,
    handleOnChange,
    filePreview,
    setFilePreview,
    handleOnCreate,
    loadings,
    error,
  };
};

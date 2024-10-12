import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { AUTH } from "../constant";
import { useNavigate } from "react-router-dom";

export const useForgotPassword = () => {
  const [userInput, setUserInput] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setUserInput((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const validateForm = () => {
    const newErrors = {};
    if (!userInput.email) newErrors.email = "email is required";
    setError(newErrors);
    return Object.keys(newErrors).length === 0 ? null : newErrors;
  };
  const handleOnForgot = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (validationErrors) return;
    setLoading(true);
    try {
      const { data } = await axios.post(`${AUTH}/forgotPassword`, userInput);
      navigate("/signIn");
      toast.success(data?.message);
    } catch (error) {
      toast.error(error?.response?.data?.message || error?.message);
    } finally {
      setLoading(false);
    }
  };

  return {
    userInput,
    error,
    handleOnChange,
    handleOnForgot,
    loading,
  };
};

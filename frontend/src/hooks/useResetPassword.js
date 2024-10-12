import axios from "axios";
import { useState } from "react";
import { AUTH } from "../constant";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export const useResetPassword = (token) => {
  const [userInput, setUserInput] = useState({
    password: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({});
  const navigate = useNavigate();

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setUserInput((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const validateForm = (e) => {
    const newErrors = {};

    if (!userInput.password) {
      newErrors.password = "required";
    } else if (userInput.password.length < 8) {
      newErrors.password = "password must be at least 8 characters";
    }
    if (!userInput.confirmPassword) {
      newErrors.confirmPassword = "required";
    } else if (userInput.confirmPassword !== userInput.password) {
      newErrors.confirmPassword = "passwords do not match";
    }

    setError(newErrors);
    return Object.keys(newErrors).length === 0 ? null : newErrors;
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    const validateErrors = validateForm();
    if (validateErrors) return;
    setLoading(true);

    try {
      const { data } = await axios.post(
        `${AUTH}/resetPassword?token=${token}`,
        {
          password: userInput.password,
        }
      );
      toast.success(data?.message);
      navigate("/signIn");
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return {
    userInput,
    error,
    loading,
    handleOnChange,
    handleResetPassword,
  };
};

import { useState } from "react";
import axios from "axios";
import { AUTH } from "../constant";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export const useRegisterUser = () => {
  const [userInput, setUserInput] = useState({
    fullName: "",
    email: "",
    password: "",
    role: "",
    selectBranch: "",
    phoneNumber: "",
  });

  const [error, setError] = useState({});
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
    if (!userInput.fullName) newErrors.fulName = "required";
    if (!userInput.email) newErrors.email = "required";
    if (!userInput.password) newErrors.password = "required";
    if (!userInput.role) newErrors.role = "required";
    if (!userInput.selectBranch) newErrors.selectBranch = "required";
    if (!userInput.phoneNumber) {
      newErrors.phoneNumber = "required";
    } else if (!/^\d+$/.test(userInput.phoneNumber)) {
      newErrors.phoneNumber = "invalid phone number";
    }

    setError(newErrors);
    return Object.keys(newErrors).length === 0 ? null : newErrors;
  };

  const handleOnRegister = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (validationErrors) return;
    setLoading(true);
    try {
      const { data } = await axios.post(`${AUTH}/register`, userInput);
      console.log(data?.message);
      toast.success(data?.message);
      navigate("/signIn");
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message || error?.message);
    } finally {
      setLoading(false);
    }
  };

  return { handleOnChange, loading, userInput, handleOnRegister, error };
};

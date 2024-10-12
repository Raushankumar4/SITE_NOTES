import { useState } from "react";
import axios from "axios";
import { AUTH } from "../constant";
import { useDispatch } from "react-redux";
import { login } from "../Redux/store/slice/authSlice";
import { useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export const useLoginUser = () => {
  const [userInput, setUserInput] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState({});
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const location = useLocation();

  const loginRoute =
    location.pathname === "/signIn"
      ? `${AUTH}/students/login`
      : `${AUTH}/teachers/login`;

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
    if (!userInput.password) newErrors.password = "password is required";
    setError(newErrors);
    return Object.keys(newErrors).length === 0 ? null : newErrors;
  };
  const handleOnLogin = async (e) => {
    e.preventDefault();
    const validateError = validateForm();
    if (validateError) return;
    setLoading(true);
    try {
      const { data } = await axios.post(`${loginRoute}`, userInput);
      dispatch(login({ token: data?.token }));
      toast.success(data?.message);
      navigate("/");
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message || error?.message);
    } finally {
      setLoading(false);
    }
  };

  return { userInput, handleOnChange, error, loading, handleOnLogin };
};

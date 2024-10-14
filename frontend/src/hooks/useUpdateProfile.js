import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { USERS } from "../constant";
import { toast } from "react-hot-toast";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const useUpdateProfile = () => {
  const token = useSelector((state) => state.auth.token);
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({
    fullName: user?.fullName || "",
    email: user?.email || "",
    phoneNumber: user?.phoneNumber || "",
  });

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const updateProfile = async (e) => {
    e.preventDefault();
    if (!token) return;
    setLoading(true);
    try {
      const responsive = await axios.put(`${USERS}/updateProfile`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      console.log(responsive);
      toast.success(responsive?.data?.message);
      navigate(-1);
    } catch (error) {
      toast.error(error?.response?.data?.message || error?.message);
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  return { updateProfile, handleOnChange, data, loading };
};

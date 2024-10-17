import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { SERVER, USERS } from "../constant";
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
    profile: null,
  });
  const [profilePreview, setProfilePreview] = useState(
    `${SERVER}/${user?.profile}` || null
  );

  const handleOnChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "profile") {
      const file = files[0];
      setData((prev) => ({
        ...prev,
        [name]: file,
      }));
      const preview = URL.createObjectURL(file);
      setProfilePreview(preview);
    } else {
      setData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const updateProfile = async (e) => {
    e.preventDefault();
    if (!token) return;
    const formData = new FormData();
    if (data.profile) formData.append("profile", data.profile);
    formData.append("fullName", data.fullName);
    formData.append("email", data.email);
    formData.append("phoneNumber", data.phoneNumber);
    setLoading(true);
    try {
      const responsive = await axios.put(`${USERS}/updateProfile`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
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
  return {
    updateProfile,
    handleOnChange,
    data,
    loading,
    profilePreview,
    setProfilePreview,
  };
};

import axios from "axios";
import { AUTH } from "../../constant";
import { logout } from "../../Redux/store/slice/authSlice";
import toast from "react-hot-toast";

export const logOutUser = async (dispatch, navigate, token) => {
  try {
    const { data } = await axios.get(`${AUTH}/logout`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      withCredentials: true,
    });
    dispatch(logout());
    toast.success(data?.message);
    navigate("/signIn");
  } catch (error) {
    toast.error(error?.response?.data?.message || error?.message);
    console.log(error);
  }
};

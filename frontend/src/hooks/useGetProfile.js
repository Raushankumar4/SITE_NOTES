import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { USERS } from "../constant";
import { setUser } from "../Redux/store/slice/userSlice";
import { toast } from "react-hot-toast";

export const useGetProfile = () => {
  const token = useSelector((state) => state.auth.token);
  console.log(token);

  const refresh = useSelector((state) => state.user.refresh);
  const dispatch = useDispatch();

  useEffect(() => {
    const getProfile = async () => {
      if (!token) return;
      try {
        const { data } = await axios.get(`${USERS}/profile`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        });

        console.log(data?.user);
        dispatch(setUser(data?.user));
      } catch (error) {
        console.log(error);
        toast.error(error?.response?.data?.message || error?.message);
      }
    };
    getProfile();
  }, [token, refresh, dispatch]);
};

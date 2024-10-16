import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { NOTES } from "../constant";
import { toast } from "react-hot-toast";
import { deleteSessionalPaper } from "../Redux/store/slice/userSlice";

export const useDeleteSessional = () => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);

  const deleteSessional = async (sessionId) => {
    if (!token) return;

    try {
      const { data } = await axios.delete(
        `${NOTES}/deleteSessional/${sessionId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      );
      dispatch(deleteSessionalPaper(sessionId));
      toast.success(data?.message);
    } catch (error) {
      console.log(error);
    }
  };

  return { deleteSessional };
};

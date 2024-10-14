import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { NOTES } from "../constant";
import { deleteSemesterPaper } from "../Redux/store/slice/userSlice";
import { toast } from "react-hot-toast";

export const useDeleteSemester = () => {
  const token = useSelector((state) => state.auth.token);
  console.log(token);

  const dispatch = useDispatch();

  const deletePaper = async (semesterId) => {
    if (!token) return;
    try {
      const { data } = await axios.delete(`${NOTES}/deleteNote/${semesterId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      });
      toast.success(data?.message);
      dispatch(deleteSemesterPaper(semesterId));
    } catch (error) {
      console.log(error);
    }
  };
  return { deletePaper };
};

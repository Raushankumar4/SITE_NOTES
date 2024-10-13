import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { NOTES } from "../constant";
import { setSemesterPaper } from "../Redux/store/slice/userSlice";

export const useGetAllSemesterPapers = () => {
  const token = useSelector((state) => state.auth.token);
  const refresh = useSelector((state) => state.user.refresh);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!token) return;

    const getAllSemesterPapers = async () => {
      try {
        const { data } = await axios.get(`${NOTES}/getALlPapers`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        });

        dispatch(setSemesterPaper(data?.allNotes));
      } catch (error) {
        console.error("Error fetching semester papers:", error);
      }
    };

    getAllSemesterPapers();
  }, [token, refresh, dispatch]);
};

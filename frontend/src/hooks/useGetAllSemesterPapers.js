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
    const getAllSemesterPapers = async () => {
      try {
        const { data } = await axios.get(`${NOTES}/getALlPapers`, {
          headers: token ? { Authorization: `Bearer ${token}` } : {},
          withCredentials: true,
        });

        console.log("Papers:", data);
        dispatch(setSemesterPaper(data?.notes));
      } catch (error) {
        console.error(
          "Error fetching semester papers:",
          error.response?.data || error.message
        );
      }
    };

    if (token) getAllSemesterPapers();
  }, [token, refresh, dispatch]);
};

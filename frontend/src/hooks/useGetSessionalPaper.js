import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { NOTES } from "../constant";
import { setSessionalPaper } from "../Redux/store/slice/userSlice";
import { useEffect } from "react";

export const useGetSessionalPaper = (semesterId) => {
  const token = useSelector((state) => state.auth.token);
  const dispatch = useDispatch();
  const refresh = useSelector((state) => state.user.refresh);

  useEffect(() => {
    const getSessionalPaper = async () => {
      if (!token || !semesterId) return;
      try {
        const { data } = await axios.get(
          `${NOTES}/getALlSessional/${semesterId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
            withCredentials: true,
          }
        );
        dispatch(setSessionalPaper(data?.allSessionalNotes));
      } catch (error) {
        console.error("Error fetching sessional papers:", error);
      }
    };

    getSessionalPaper();
  }, [token, refresh, dispatch, semesterId]);
};

import { createSlice } from "@reduxjs/toolkit";

const userSlce = createSlice({
  name: "user",
  initialState: {
    user: null,
    refresh: false,
    semesterPapers: null,
    sessionalPapers: null,
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setRefresh: (state) => {
      state.refresh = !state.refresh;
    },
    setSemesterPaper: (state, action) => {
      state.semesterPapers = action.payload;
    },
    deleteSemesterPaper: (state, action) => {
      state.semesterPapers = state.semesterPapers?.filter(
        (paper) => paper?._id !== action.payload
      );
    },
    setSessionalPaper: (state, action) => {
      state.sessionalPapers = action.payload;
    },
    deleteSessionalPaper: (state, action) => {
      state.sessionalPapers = state.sessionalPapers?.filter(
        (paper) => paper?._id !== action.payload
      );
    },
  },
});
export const {
  setUser,
  setRefresh,
  setSemesterPaper,
  setSessionalPaper,
  deleteSemesterPaper,
  deleteSessionalPaper,
} = userSlce.actions;
export default userSlce.reducer;

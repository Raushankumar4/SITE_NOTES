import { createSlice } from "@reduxjs/toolkit";

const userSlce = createSlice({
  name: "user",
  initialState: {
    user: null,
    refresh: false,
    semesterPapers: null,
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
  },
});
export const { setUser, setRefresh, setSemesterPaper } = userSlce.actions;
export default userSlce.reducer;

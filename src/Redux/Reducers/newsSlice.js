import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  newsData: [],
};

export const newsSlice = createSlice({
  name: "news",
  initialState,
  reducers: {
    addData: (state, action) => {
      state.newsData = action.payload;
    },
  },
});

export const { addData } = newsSlice.actions;

export default newsSlice.reducer;

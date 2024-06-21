import { configureStore } from "@reduxjs/toolkit";
import newsReducer from "./Reducers/newsSlice";

const store = configureStore({
  reducer: { news: newsReducer },
});

export default store;

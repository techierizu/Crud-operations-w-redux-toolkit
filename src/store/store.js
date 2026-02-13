import { configureStore } from "@reduxjs/toolkit";
// import recordReducer from "./recordsSlice";
import recordSlice from "./recordSlice";

export const store = configureStore({
  reducer: {
    records: recordSlice,
  },
});
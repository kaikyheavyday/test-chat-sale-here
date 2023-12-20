import { configureStore } from "@reduxjs/toolkit";
import profileSlice from "./reducers";

export default configureStore({
  reducer: {
    profile: profileSlice,
  },
});

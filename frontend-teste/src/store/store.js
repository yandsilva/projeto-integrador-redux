import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slice/userSlice";
import addressReducer from "./slice/addressSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    address: addressReducer,
  },
});

import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slice/userSlice";
// import forgotResetPasswordReducer from "./slice/forgotResetPasswordSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    // forgotPassword: forgotResetPasswordReducer,
  },
});
